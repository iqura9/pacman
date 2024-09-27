import { styled } from 'styled-components';
import { GhostNPC } from './Ghost';
import Pacman from './Pacman';
import { Coords, Move } from './Play';

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
  id: string;
  ghostType: 'red' | 'inky' | 'clyde';
  coords: Coords;
};

type BoardProps = {
  board: number[][];
  pacmanPos: Coords;
  direction: Move;
  ghosts: Ghost[];
};

export function Board({ board, pacmanPos, direction, ghosts }: BoardProps) {
  return (
    <>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} isWall={cell === 1}>
              {pacmanPos.row === rowIndex && pacmanPos.col === colIndex ? (
                <Pacman direction={direction} />
              ) : null}
              {ghosts.map((ghost) => {
                const currentCoords = { row: rowIndex, col: colIndex };
                if (
                  currentCoords.row === ghost.coords.row &&
                  currentCoords.col === ghost.coords.col
                )
                  return (
                    <GhostNPC key={ghost.id} ghosts={ghosts} ghost={ghost} />
                  );
              })}
            </Cell>
          ))}
        </Row>
      ))}
    </>
  );
}
