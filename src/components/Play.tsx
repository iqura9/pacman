import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';
import { getDirectionCoords } from '../bfs';
import { GHOST_SPEED, PLAYERS_SPEED } from '../constants';
import { useInkyGhost } from '../hooks/useInkyGhost';
import { useRedGhost } from '../hooks/useRedGhost';
import { board, isWalkable } from '../utils';
import { Board } from './Board';
import GameEnded from './GameEnded';

const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: absolute;

  &:focus {
    outline: none;
  }
`;
export type Coords = {
  row: number;
  col: number;
};
export type Move = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;

export const Play = () => {
  const [direction, setDirection] = useState<Move>(null);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);

  const handleStopGame = useCallback(() => setIsGameEnded(true), []);

  const [pacmanPos, setPacmanPos] = useState({
    row: board[0].length - 2,
    col: 1,
  });

  const pacmanDirection = useMemo(
    () => getDirectionCoords(direction),
    [direction]
  );

  const redGhostCoords = useRedGhost(pacmanPos, GHOST_SPEED, handleStopGame);
  const inkyGhostCoords = useInkyGhost(
    pacmanPos,
    pacmanDirection,
    redGhostCoords,
    GHOST_SPEED,
    handleStopGame
  );

  console.log('inkyGhostCoords', inkyGhostCoords);

  const inputDiv = useRef<HTMLInputElement | null>(null);

  const mouseEnter = () => {
    inputDiv.current?.focus();
  };

  const mouseLeave = () => {
    inputDiv.current?.blur();
  };

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newDirection: Move = null;

    switch (e.key) {
      case 'ArrowUp':
        newDirection = 'UP';
        break;
      case 'ArrowDown':
        newDirection = 'DOWN';
        break;
      case 'ArrowLeft':
        newDirection = 'LEFT';
        break;
      case 'ArrowRight':
        newDirection = 'RIGHT';
        break;
      default:
        break;
    }

    if (newDirection && newDirection !== direction) {
      setDirection(newDirection);
    }
  };

  useEffect(() => {
    const interval = setInterval(movePacman, PLAYERS_SPEED);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [direction, movePacman]);

  if (isGameEnded) return <GameEnded />;

  return (
    <GameBoard
      ref={inputDiv}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <Board
        board={board}
        pacmanPos={pacmanPos}
        direction={direction}
        redGhostPos={redGhostCoords}
        inkyGhostPos={inkyGhostCoords}
      />
    </GameBoard>
  );
};
