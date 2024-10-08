import { useEffect, useState } from 'react';
import { bfs } from '../bfs';
import { Coords } from '../components/Play';

let lastMoveTime: number;

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const getRandomIntegerInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function useInkyGhost(
  pacmanCoords: Coords,
  pacmanDirection: Coords,
  lastCoords: Coords,
  ghostId: string,
  redGhostCoords: Coords,
  GHOST_SPEED: number,
  handleStopGame: (id: string) => void
) {
  const [inkyCoords, setInkyCoords] = useState<Coords>(lastCoords);

  useEffect(() => {
    lastMoveTime = performance.now();
  }, [inkyCoords]);

  useEffect(() => {
    if (
      inkyCoords.row === pacmanCoords.row &&
      inkyCoords.col === pacmanCoords.col
    )
      handleStopGame(ghostId);
  }, [inkyCoords, pacmanCoords, handleStopGame]);

  useEffect(() => {
    let animationFrameId: number;

    const moveInkyGhost = () => {
      setInkyCoords((prevCoords: Coords) => {
        const currentTime = performance.now();

        if (currentTime - lastMoveTime >= GHOST_SPEED) {
          const pacmanFutureCoords: Coords = {
            row: pacmanCoords.row + pacmanDirection.row * 2,
            col: pacmanCoords.col + pacmanDirection.col * 2,
          };

          const targetCoords: Coords = {
            row: clamp(
              pacmanFutureCoords.row +
                (pacmanFutureCoords.row - redGhostCoords.row),
              1, // minimum row index
              17 // maximum row index
            ),
            col: clamp(
              pacmanFutureCoords.col +
                (pacmanFutureCoords.col - redGhostCoords.col),
              1, // minimum col index
              15 // maximum col index
            ),
          };

          const isSameRedRow = redGhostCoords.row === prevCoords.row;

          const randomNumber = getRandomIntegerInclusive(0, 1);
          const movementUpOrDown = randomNumber ? 1 : -1;

          const newTargetCoords: Coords = {
            row: prevCoords.row + movementUpOrDown,
            col: prevCoords.col,
          };

          if (isSameRedRow) {
            console.log('movementUpOrDown', movementUpOrDown);
          }

          const updatedTargetCoords = isSameRedRow
            ? newTargetCoords
            : targetCoords;

          const path = bfs(prevCoords, updatedTargetCoords);

          if (path.length > 0) {
            return path[0];
          }
        }

        return prevCoords;
      });

      animationFrameId = requestAnimationFrame(moveInkyGhost);
    };

    animationFrameId = requestAnimationFrame(moveInkyGhost);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pacmanCoords, pacmanDirection, redGhostCoords, GHOST_SPEED]);

  return inkyCoords;
}
