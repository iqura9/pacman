import { useCallback, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { Ghost } from '../components/Board';
import { Coords } from '../components/Play';
import { useTimer } from '../contexts';
import { board, isWalkable } from '../utils';

const defaultGhosts: Ghost[] = [
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
];

export function useGhosts(
  setPacmanPos: React.Dispatch<
    React.SetStateAction<{
      row: number;
      col: number;
    }>
  >
) {
  const { level, setLevel } = useTimer();
  const [ghosts, setGhosts] = useState<Ghost[]>(defaultGhosts);

  useEffect(() => {
    if (ghosts.length === 0) {
      setPacmanPos({
        row: board[0].length - 2,
        col: board[0].length - 2,
      });

      setLevel((prev) => {
        return prev + 1;
      });

      alert(
        `Congrats, you won this level. In 5 seconds you will be redirected to ${
          level + 1
        } level`
      );

      const newGhosts: Ghost[] = [];

      for (let i = 0; i < level; i++) {
        const randomIndex = Math.floor(Math.random() * defaultGhosts.length);
        let { ghostType, coords } = defaultGhosts[randomIndex];

        const findNearbyWalkable = (row: number, col: number) => {
          const directions = [
            { row: 0, col: 1 },
            { row: 1, col: 0 },
            { row: 0, col: -1 },
            { row: -1, col: 0 },
          ];

          for (let dir of directions) {
            const newRow = row + dir.row;
            const newCol = col + dir.col;

            if (
              isWalkable(newRow, newCol) &&
              !ghosts.find(
                (el) => el.coords.col === newCol && el.coords.row === newRow
              ) &&
              !defaultGhosts.find(
                (el) => el.coords.col === newCol && el.coords.row === newRow
              ) &&
              !newGhosts.find(
                (el) => el.coords.col === newCol && el.coords.row === newRow
              )
            ) {
              return { row: newRow, col: newCol };
            }
          }
          return null;
        };

        if (
          !isWalkable(coords.row, coords.col) ||
          ghosts.find(
            (el) => el.coords.col === coords.col && el.coords.row === coords.row
          ) ||
          newGhosts.find(
            (el) => el.coords.col === coords.col && el.coords.row === coords.row
          ) ||
          defaultGhosts.find(
            (el) => el.coords.col === coords.col && el.coords.row === coords.row
          )
        ) {
          const newCoords = findNearbyWalkable(coords.row, coords.col);
          if (newCoords) coords = newCoords;
          else continue;
        }

        newGhosts.push({ id: uuid(), ghostType, coords });
      }

      setGhosts([...defaultGhosts, ...newGhosts]);
    }
  }, [ghosts, setLevel]);

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
