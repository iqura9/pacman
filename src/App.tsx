import React, { useState } from "react";
import Pacman from "./components/Pacman";

const board = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const App: React.FC = () => {
  const [pacmanPos, setPacmanPos] = useState({ row: 1, col: 1 });

  const canMoveTo = (row: number, col: number) => {
    return board[row][col] === 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newRow = pacmanPos.row;
    let newCol = pacmanPos.col;

    switch (e.key) {
      case "ArrowUp":
        if (newRow > 0 && canMoveTo(newRow - 1, newCol)) newRow--;
        break;
      case "ArrowDown":
        if (newRow < board.length - 1 && canMoveTo(newRow + 1, newCol))
          newRow++;
        break;
      case "ArrowLeft":
        if (newCol > 0 && canMoveTo(newRow, newCol - 1)) newCol--;
        break;
      case "ArrowRight":
        if (newCol < board[0].length - 1 && canMoveTo(newRow, newCol + 1))
          newCol++;
        break;
      default:
        break;
    }

    setPacmanPos({ row: newRow, col: newCol });
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: "flex" }}>
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: cell === 1 ? "blue" : "black",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pacmanPos.row === rowIndex && pacmanPos.col === colIndex ? (
              <Pacman />
            ) : null}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
      <h1>Pacman Game</h1>
      <div>{renderBoard()}</div>
    </div>
  );
};

export default App;
