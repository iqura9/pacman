import { useEffect, useState } from 'react';
import { bfs } from '../bfs';
import { Coords } from '../components/Play';
import { board } from '../utils';

let lastMoveTime: number;

const getDistance = (pos1: Coords, pos2: Coords) => {
  return Math.sqrt(
    Math.pow(pos1.row - pos2.row, 2) + Math.pow(pos1.col - pos2.col, 2)
  );
};

export function useClydeGhost(
  pacmanCoords: Coords,
  lastCoords: Coords,
  ghostId: string,
  GHOST_SPEED: number,
  handleStopGame: (id: string) => void
) {
  const [clydeCoords, setClydeCoords] = useState<Coords>(lastCoords);

  const scatterTarget = { row: board[0].length, col: 1 };

  useEffect(() => {
    lastMoveTime = performance.now();
  }, [clydeCoords]);

  useEffect(() => {
    if (
      clydeCoords.row === pacmanCoords.row &&
      clydeCoords.col === pacmanCoords.col
    )
      handleStopGame(ghostId);
  }, [clydeCoords, pacmanCoords, handleStopGame, ghostId]);

  useEffect(() => {
    let animationFrameId: number;

    const moveClydeGhost = () => {
      setClydeCoords((prevCoords: Coords) => {
        const currentTime = performance.now();

        if (currentTime - lastMoveTime >= GHOST_SPEED) {
          const distanceToPacman = getDistance(prevCoords, pacmanCoords);

          const targetCoords =
            distanceToPacman > 8 ? pacmanCoords : scatterTarget;

          const path = bfs(prevCoords, targetCoords);
          lastMoveTime = currentTime;
          if (path.length > 0) {
            return path[0];
          }
        }

        return prevCoords;
      });

      animationFrameId = requestAnimationFrame(moveClydeGhost);
    };

    animationFrameId = requestAnimationFrame(moveClydeGhost);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pacmanCoords, GHOST_SPEED]);

  return clydeCoords;
}
