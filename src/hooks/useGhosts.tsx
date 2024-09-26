import { useCallback, useEffect, useState } from 'react';
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
    { ghostType: 'red', coords: redGhostCoords },
    { ghostType: 'inky', coords: inkyGhostCoords },
    { ghostType: 'clyde', coords: clydeGhostCoords },
  ]);

  // Function to update ghost position
  const updateGhostPosition = (type: string, newCoords: Coords) => {
    setGhosts((prevGhosts) =>
      prevGhosts.map((ghost) =>
        ghost.ghostType === type ? { ...ghost, coords: newCoords } : ghost
      )
    );
  };

  const addGhost = (type: 'red' | 'inky' | 'clyde', coords: Coords) => {
    setGhosts((prevGhosts) => [...prevGhosts, { ghostType: type, coords }]);
  };

  const removeGhost = (type: string) => {
    setGhosts((prevGhosts) =>
      prevGhosts.filter((ghost) => ghost.ghostType !== type)
    );
  };

  useEffect(() => {
    updateGhostPosition('red', redGhostCoords);
  }, [redGhostCoords]);

  useEffect(() => {
    updateGhostPosition('inky', inkyGhostCoords);
  }, [inkyGhostCoords]);

  useEffect(() => {
    updateGhostPosition('clyde', clydeGhostCoords);
  }, [clydeGhostCoords]);

  return { ghosts, setGhosts, isGameEnded, addGhost, removeGhost };
}
