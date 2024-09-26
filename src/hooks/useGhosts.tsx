import { useCallback, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { Ghost } from '../components/Board';
import { Coords } from '../components/Play';
import { GHOST_SPEED } from '../constants';
import { useClydeGhost } from './useClydeGhost';
import { useInkyGhost } from './useInkyGhost';
import { useRedGhost } from './useRedGhost';
interface useGhostsProps {
  pacmanPos: Coords;
  pacmanDirection: Coords;
}

export function useGhosts({ pacmanPos, pacmanDirection }: useGhostsProps) {
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const handleStopGame = useCallback(() => setIsGameEnded(true), []);

  const redGhostCoords = useRedGhost(pacmanPos, GHOST_SPEED, handleStopGame);

  const inkyGhostCoords = useInkyGhost(
    pacmanPos,
    pacmanDirection,
    redGhostCoords,
    GHOST_SPEED,
    handleStopGame
  );

  const clydeGhostCoords = useClydeGhost(
    pacmanPos,
    GHOST_SPEED,
    handleStopGame
  );

  const [ghosts, setGhosts] = useState<Ghost[]>([
    { id: '1', ghostType: 'red', coords: redGhostCoords },
    { id: '2', ghostType: 'inky', coords: inkyGhostCoords },
    { id: '3', ghostType: 'clyde', coords: clydeGhostCoords },
  ]);

  const updateGhostPosition = (id: string, newCoords: Coords) => {
    setGhosts((prevGhosts) =>
      prevGhosts.map((ghost) =>
        ghost.id === id ? { ...ghost, coords: newCoords } : ghost
      )
    );
  };

  const addGhost = (type: 'red' | 'inky' | 'clyde', coords: Coords) => {
    setGhosts((prevGhosts) => [
      ...prevGhosts,
      { id: uuid(), ghostType: type, coords },
    ]);
  };

  const removeGhost = (id: string) => {
    setGhosts((prevGhosts) => prevGhosts.filter((ghost) => ghost.id !== id));
  };

  useEffect(() => {
    updateGhostPosition('1', redGhostCoords);
  }, [redGhostCoords]);

  useEffect(() => {
    updateGhostPosition('2', inkyGhostCoords);
  }, [inkyGhostCoords]);

  useEffect(() => {
    updateGhostPosition('3', clydeGhostCoords);
  }, [clydeGhostCoords]);

  return { ghosts, setGhosts, isGameEnded, addGhost, removeGhost };
}
