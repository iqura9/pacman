import { useEffect, useState } from 'react';
import { bfs } from '../bfs';
import { Coords } from '../components/Play';
import { board } from '../utils';

let lastMoveTime: number;

export function useRedGhost(
  pacmanCoords: Coords,
  GHOST_SPEED: number,
  handleStopGame: () => void
) {
  const [redGhostCoords, setRedGhostCoords] = useState<Coords>({
    row: 1,
    col: board[0].length - 2,
  });

  useEffect(() => {
    lastMoveTime = performance.now();
  }, [redGhostCoords]);

  useEffect(() => {
    if (
      redGhostCoords.row === pacmanCoords.row &&
      redGhostCoords.col === pacmanCoords.col
    )
      handleStopGame();
  }, [pacmanCoords, redGhostCoords, handleStopGame]);

  useEffect(() => {
    let animationFrameId: number;

    const moveRedGhost = () => {
      setRedGhostCoords((prevCoords: Coords) => {
        const currentTime = performance.now();

        if (currentTime - lastMoveTime >= GHOST_SPEED) {
          const path = bfs(prevCoords, pacmanCoords);
          lastMoveTime = currentTime;
          if (path.length > 0) {
            return path[0];
          }
        }

        return prevCoords;
      });

      animationFrameId = requestAnimationFrame(moveRedGhost);
    };

    animationFrameId = requestAnimationFrame(moveRedGhost);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pacmanCoords, GHOST_SPEED]);

  return redGhostCoords;
}
