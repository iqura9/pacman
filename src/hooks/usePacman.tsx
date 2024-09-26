import { Dispatch, useCallback, useEffect, useMemo, useState } from 'react';
import { getDirectionCoords } from '../bfs';
import { Move } from '../components/Play';
import { PLAYERS_SPEED } from '../constants';
import { board, isWalkable } from '../utils';

export function usePacman(
  direction: Move,
  setDirection: Dispatch<React.SetStateAction<Move>>
) {
  const [pacmanPos, setPacmanPos] = useState({
    row: board[0].length - 2,
    col: board[0].length - 2,
  });

  const pacmanDirection = useMemo(
    () => getDirectionCoords(direction),
    [direction]
  );

  const movePacman = useCallback(() => {
    if (!direction) return;

    setPacmanPos((prevPos) => {
      let newRow = prevPos.row;
      let newCol = prevPos.col;

      switch (direction) {
        case 'UP':
          if (newRow > 0 && isWalkable(newRow - 1, newCol)) {
            newRow--;
          }
          break;
        case 'DOWN':
          if (newRow < board.length - 1 && isWalkable(newRow + 1, newCol)) {
            newRow++;
          }
          break;
        case 'LEFT':
          if (newCol > 0 && isWalkable(newRow, newCol - 1)) {
            newCol--;
          }
          break;
        case 'RIGHT':
          if (newCol < board[0].length - 1 && isWalkable(newRow, newCol + 1)) {
            newCol++;
          }
          break;
        default:
          break;
      }

      if (prevPos.row === newRow && prevPos.col === newCol) setDirection(null);

      return { row: newRow, col: newCol };
    });
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(movePacman, PLAYERS_SPEED);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [direction, movePacman]);

  return { pacmanPos, pacmanDirection, setPacmanPos, movePacman };
}
