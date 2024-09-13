import { useState } from 'react';
import { Coords } from '../components/Play';
import { board } from '../utils';

export function useRedGhost(pacmanCoords: Coords) {
  const [redGhostCoords, setRedGhostCoords] = useState({
    row: board.length - 2,
    col: board[0].length - 2,
  });

  return redGhostCoords;
}
