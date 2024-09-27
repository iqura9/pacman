import { useCallback, useState } from 'react';
import uuid from 'react-uuid';
import { Ghost } from '../components/Board';
import { Coords } from '../components/Play';
import { board } from '../utils';

export function useGhosts() {
  const [ghosts, setGhosts] = useState<Ghost[]>([
    {
      id: '1',
      ghostType: 'red',
      coords: {
        row: 1,
        col: board[0].length - 2,
      },
    },
    { id: '2', ghostType: 'inky', coords: { row: 1, col: 1 } },
    {
      id: '3',
      ghostType: 'clyde',
      coords: { row: board[0].length - 2, col: 1 },
    },
  ]);

  const updateGhostPosition = useCallback(
    (id: string, newCoords: Coords) => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) =>
          ghost.id === id ? { ...ghost, coords: newCoords } : ghost
        )
      );
    },
    [setGhosts]
  );

  const addGhost = useCallback(
    (type: 'red' | 'inky' | 'clyde', coords: Coords) => {
      setGhosts((prevGhosts) => [
        ...prevGhosts,
        { id: uuid(), ghostType: type, coords },
      ]);
    },
    [setGhosts]
  );

  const removeGhost = useCallback(
    (id: string) => {
      setGhosts((prevGhosts) => prevGhosts.filter((ghost) => ghost.id !== id));
    },
    [setGhosts]
  );

  return {
    ghosts,
    setGhosts,
    addGhost,
    removeGhost,
    updateGhostPosition,
  };
}
