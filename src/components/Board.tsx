import { styled } from 'styled-components';
import Pacman from './Pacman';

import InkyGhost from './InkyGhost';
import { Coords, Move } from './Play';
import RedGhost from './RedGoast';
import ClydeGhost from './ClydeGhost';

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

type BoardProps = {
  board: number[][];
  pacmanPos: Coords;
  direction: Move;
  redGhostPos: Coords;
  inkyGhostPos: Coords;
  clydeGhostPos: Coords;
};

export function Board({
  board,
  pacmanPos,
  direction,
  redGhostPos,
  inkyGhostPos,
  clydeGhostPos,
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
              {redGhostPos.row === rowIndex && redGhostPos.col === colIndex ? (
                <RedGhost />
              ) : null}
              {inkyGhostPos.row === rowIndex &&
              inkyGhostPos.col === colIndex ? (
                <InkyGhost />
              ) : null}

              {clydeGhostPos.row === rowIndex &&
              clydeGhostPos.col === colIndex ? (
                <ClydeGhost />
              ) : null}

              {inkyGhostPos.row !== rowIndex &&
              inkyGhostPos.col !== colIndex &&
              redGhostPos.row !== rowIndex &&
              redGhostPos.col !== colIndex &&
              pacmanPos.row !== rowIndex &&
              pacmanPos.col !== colIndex ? (
                <span style={{ color: 'red' }}>
                  ({rowIndex},{colIndex})
                </span>
              ) : null}
            </Cell>
          ))}
        </Row>
      ))}
    </>
  );
}
