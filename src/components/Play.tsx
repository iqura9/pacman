import { memo } from 'react';

import styled from 'styled-components';
import { useGameBoard } from '../hooks/useGameBoard';
import { useGhosts } from '../hooks/useGhosts';
import { usePacman } from '../hooks/usePacman';
import { board } from '../utils';
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

export const Play = memo(() => {
  const {
    inputDiv,
    direction,
    setDirection,
    mouseEnter,
    mouseLeave,
    handleKeyDown,
  } = useGameBoard();

  const { pacmanPos, pacmanDirection } = usePacman(direction, setDirection);

  const { ghosts, setGhosts, isGameEnded } = useGhosts({
    pacmanPos,
    pacmanDirection,
  });

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
        ghosts={ghosts}
        setGhosts={setGhosts}
      />
    </GameBoard>
  );
});
