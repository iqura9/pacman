import { memo, useCallback, useState } from 'react';

import styled from 'styled-components';
import { useTimer } from '../contexts';
import { PacmanProvider } from '../contexts/pacmanContext';
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

  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);

  const { mode } = useTimer();
  const isScatter = mode === 'scatter';

  const { pacmanPos, pacmanDirection, setPacmanPos } = usePacman(
    direction,
    setDirection
  );

  const { ghosts, updateGhostPosition, addGhost, removeGhost } =
    useGhosts(setPacmanPos);

  const handleStopGame = useCallback(
    (id: string) => {
      if (isScatter) {
        removeGhost(id);
      } else {
        setIsGameEnded(true);
        setPacmanPos({
          row: board[0].length - 2,
          col: board[0].length - 2,
        });
      }
    },
    [isScatter, removeGhost, setPacmanPos]
  );

  if (isGameEnded)
    return <GameEnded onRestart={() => window.location.reload()} />;

  return (
    <PacmanProvider
      pacmanPos={pacmanPos}
      pacmanDirection={pacmanDirection}
      handleStopGame={handleStopGame}
      updateGhostPosition={updateGhostPosition}
      addGhost={addGhost}
      removeGhost={removeGhost}
      setPacmanPos={setPacmanPos}
    >
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
        />
      </GameBoard>
    </PacmanProvider>
  );
});
