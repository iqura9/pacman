import { styled } from 'styled-components';
import Pacman from './Pacman';
import { Move } from './Play';

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
  pacmanPos: {
    row: number;
    col: number;
  };
  direction: Move;
};

export function Board({ board, pacmanPos, direction }: BoardProps) {
  return (
    <>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} isWall={cell === 1}>
              {pacmanPos.row === rowIndex && pacmanPos.col === colIndex ? (
                <Pacman direction={direction} />
              ) : null}
            </Cell>
          ))}
        </Row>
      ))}
    </>
  );
}
