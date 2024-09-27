import { useEffect } from 'react';
import { GHOST_SPEED } from '../constants';
import { useTimer } from '../contexts';
import { usePacmanData } from '../contexts/pacmanContext';
import { useInkyGhost } from '../hooks/useInkyGhost';
import { GhostProps } from './Ghost';
import { GhostStyled } from './styled';

const InkyGhost = ({ ghost, ghosts }: GhostProps) => {
  const { mode } = useTimer();
  const isScatter = mode === 'scatter';

  const { pacmanPos, handleStopGame, pacmanDirection, updateGhostPosition } =
    usePacmanData();

  const redGhost = ghosts?.find((ghost) => ghost.ghostType === 'red');

  const inkyGhostCoords = useInkyGhost(
    pacmanPos,
    pacmanDirection,
    ghost.coords,
    ghost.id,
    redGhost?.coords ?? { row: 1, col: 1 },
    GHOST_SPEED,
    handleStopGame
  );

  useEffect(() => {
    updateGhostPosition(ghost.id, inkyGhostCoords);
  }, [inkyGhostCoords]);

  return <GhostStyled scatter={isScatter} color="blue" />;
};

export default InkyGhost;
