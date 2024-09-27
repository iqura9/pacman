import { memo, useEffect } from 'react';
import { GHOST_SPEED } from '../constants';
import { useTimer } from '../contexts';
import { usePacmanData } from '../contexts/pacmanContext';
import { useRedGhost } from '../hooks/useRedGhost';
import { GhostProps } from './Ghost';
import { GhostStyled } from './styled';

const RedGhost = ({ ghost }: GhostProps) => {
  const { mode } = useTimer();
  const isScatter = mode === 'scatter';

  const { pacmanPos, handleStopGame, updateGhostPosition } = usePacmanData();

  const redGhostCoords = useRedGhost(
    pacmanPos,
    ghost.coords,
    ghost.id,
    GHOST_SPEED,
    handleStopGame
  );

  useEffect(() => {
    updateGhostPosition(ghost.id, redGhostCoords);
  }, [redGhostCoords]);

  return <GhostStyled scatter={isScatter} color="red" />;
};

export default memo(RedGhost);
