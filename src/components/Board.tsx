import React from 'react';
import { styled } from 'styled-components';
import ClydeGhost from './ClydeGhost';
import InkyGhost from './InkyGhost';
import Pacman from './Pacman';
import { Coords, Move } from './Play';
import RedGhost from './RedGoast';

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div<{ isWall: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.isWall ? 'blue' : 'black')};
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type Ghost = {
  ghostType: 'red' | 'inky' | 'clyde';
  coords: Coords;
};

type BoardProps = {
  board: number[][];
  pacmanPos: Coords;
  direction: Move;
  ghosts: Ghost[];
  setGhosts: React.Dispatch<React.SetStateAction<Ghost[]>>;
};

function renderGhost(ghostType: string) {
  switch (ghostType) {
    case 'red':
      return <RedGhost />;
    case 'inky':
      return <InkyGhost />;
    case 'clyde':
      return <ClydeGhost />;
    default:
      return null;
  }
}

export function Board({
  board,
  pacmanPos,
  direction,
  ghosts,
  setGhosts,
}: BoardProps) {
  return (
    <>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} isWall={cell === 1}>
              {pacmanPos.row === rowIndex && pacmanPos.col === colIndex ? (
                <Pacman direction={direction} />
              ) : null}
              {ghosts.map((ghost, index) =>
                ghost.coords.row === rowIndex &&
                ghost.coords.col === colIndex ? (
                  <React.Fragment key={index}>
                    {renderGhost(ghost.ghostType)}
                  </React.Fragment>
                ) : null
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </>
  );
}
