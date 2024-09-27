import { useEffect } from 'react';
import { GHOST_SPEED } from '../constants';
import { useTimer } from '../contexts';
import { usePacmanData } from '../contexts/pacmanContext';
import { useClydeGhost } from '../hooks/useClydeGhost';
import { GhostProps } from './Ghost';
import { GhostStyled } from './styled';

const ClydeGhost = ({ ghost, updateGhostPosition }: GhostProps) => {
  const { mode } = useTimer();
  const isScatter = mode === 'scatter';

  const { pacmanPos, handleStopGame } = usePacmanData();

  const clydeGhostCoords = useClydeGhost(
    pacmanPos,
    ghost.coords,
    GHOST_SPEED,
    handleStopGame
  );

  useEffect(() => {
    updateGhostPosition(ghost.id, clydeGhostCoords);
  }, [clydeGhostCoords]);

  return <GhostStyled scatter={isScatter} color="orange" />;
};

export default ClydeGhost;
