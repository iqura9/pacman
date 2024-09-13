import React, { useRef, useState } from "react";

import styled from "styled-components";
import Pacman from "./Pacman";

const board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

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

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div<{ isWall: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.isWall ? "blue" : "black")};
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Play = () => {
  const [pacmanPos, setPacmanPos] = useState({ row: 1, col: 1 });
  const [direction, setDirection] = useState("RIGHT");

  const inputDiv = useRef<HTMLInputElement | null>(null);

  const mouseEnter = () => {
    inputDiv.current?.focus();
  };

  const mouseLeave = () => {
    inputDiv.current?.blur();
  };

  const canMoveTo = (row: number, col: number) => {
    return board[row][col] === 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log(e);
    let newRow = pacmanPos.row;
    let newCol = pacmanPos.col;

    switch (e.key) {
      case "ArrowUp":
        if (newRow > 0 && canMoveTo(newRow - 1, newCol)) {
          newRow--;
          setDirection("UP");
        }
        break;
      case "ArrowDown":
        if (newRow < board.length - 1 && canMoveTo(newRow + 1, newCol)) {
          newRow++;
          setDirection("DOWN");
        }
        break;
      case "ArrowLeft":
        if (newCol > 0 && canMoveTo(newRow, newCol - 1)) {
          newCol--;
          setDirection("LEFT");
        }
        break;
      case "ArrowRight":
        if (newCol < board[0].length - 1 && canMoveTo(newRow, newCol + 1)) {
          newCol++;
          setDirection("RIGHT");
        }
        break;
      default:
        break;
    }

    setPacmanPos({ row: newRow, col: newCol });
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((cell, colIndex) => (
          <Cell key={colIndex} isWall={cell === 1}>
            {pacmanPos.row === rowIndex && pacmanPos.col === colIndex ? (
              <Pacman direction={direction} />
            ) : null}
          </Cell>
        ))}
      </Row>
    ));
  };

  return (
    <GameBoard
      ref={inputDiv}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {renderBoard()}
    </GameBoard>
  );
};
