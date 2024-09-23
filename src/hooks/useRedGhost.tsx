import { useEffect, useState } from 'react';
import { Coords } from '../components/Play';
import { board } from '../utils';

function isWalkable(row: number, col: number) {
  return board[row] && board[row][col] === 0;
}

const UP = { row: -1, col: 0 };
const DOWN = { row: 1, col: 0 };
const LEFT = { row: 0, col: -1 };
const RIGHT = { row: 0, col: 1 };

const directions = [UP, DOWN, LEFT, RIGHT];

type BFSPath = { row: number; col: number; path: Coords[] };

function bfs(start: Coords, target: Coords) {
  const queue: BFSPath[] = [];
  const visited: boolean[][] = Array(board.length)
    .fill(false)
    .map(() => Array(board[0].length).fill(false));

  queue.push({ row: start.row, col: start.col, path: [] });
  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    const { row, col, path } = queue.shift()!;

    // If we reached Pac-Man's position
    if (row === target.row && col === target.col) {
      return path;
    }

    // Explore all possible directions
    for (const direction of directions) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;

      if (isWalkable(newRow, newCol) && !visited[newRow][newCol]) {
        visited[newRow][newCol] = true;
        queue.push({
          row: newRow,
          col: newCol,
          path: [...path, { row: newRow, col: newCol }],
        });
      }
    }
  }

  return [];
}

// export function useRedGhost(pacmanCoords: Coords, GHOST_SPEED: number) {
//   const [redGhostCoords, setRedGhostCoords] = useState<Coords>({
//     row: board.length - 2,
//     col: board[0].length - 2,
//   });

//   useEffect(() => {
//     const moveRedGhost = () => {
//       setRedGhostCoords((prevCoords: Coords) => {
//         const path = bfs(prevCoords, pacmanCoords);
//         console.log(path);
//         if (path.length > 0) {
//           return path[0];
//         }
//         return prevCoords;
//       });
//     };
//     let intervalId: number;
//     const timeoutId = setTimeout(() => {
//       moveRedGhost();

//       intervalId = setInterval(moveRedGhost, GHOST_SPEED);
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//       clearTimeout(timeoutId);
//     };
//   }, [pacmanCoords, GHOST_SPEED]);

//   return redGhostCoords;
// }

let lastMoveTime: number;

export function useRedGhost(pacmanCoords: Coords, GHOST_SPEED: number) {
  const [redGhostCoords, setRedGhostCoords] = useState<Coords>({
    row: board.length - 2,
    col: board[0].length - 2,
  });

  useEffect(() => {
    lastMoveTime = performance.now();
  }, [redGhostCoords]);

  useEffect(() => {
    let animationFrameId: number;

    const moveRedGhost = () => {
      setRedGhostCoords((prevCoords: Coords) => {
        const currentTime = performance.now();

        if (currentTime - lastMoveTime >= GHOST_SPEED) {
          const path = bfs(prevCoords, pacmanCoords);
          lastMoveTime = currentTime;
          if (path.length > 0) {
            return path[0];
          }
        }

        return prevCoords;
      });

      animationFrameId = requestAnimationFrame(moveRedGhost);
    };

    animationFrameId = requestAnimationFrame(moveRedGhost);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pacmanCoords, GHOST_SPEED]);

  return redGhostCoords;
}
