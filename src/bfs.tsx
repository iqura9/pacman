import { Coords, Move } from './components/Play';
import { board, isWalkable } from './utils';

const UP = { row: -1, col: 0 };
const DOWN = { row: 1, col: 0 };
const LEFT = { row: 0, col: -1 };
const RIGHT = { row: 0, col: 1 };

const directions = [UP, DOWN, LEFT, RIGHT];

export const getDirectionCoords = (direction: Move) => {
  switch (direction) {
    case 'UP':
      return UP;
    case 'DOWN':
      return DOWN;
    case 'LEFT':
      return LEFT;
    case 'RIGHT':
      return RIGHT;
    default:
      return { row: 0, col: 0 };
  }
};

type BFSPath = { row: number; col: number; path: Coords[] };

export function bfs(start: Coords, target: Coords) {
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
