import { Ghost } from './Board';
import ClydeGhost from './ClydeGhost';
import InkyGhost from './InkyGhost';
import RedGhost from './RedGoast';

export interface GhostProps {
  ghost: Ghost;
  ghosts?: Ghost[];
}

export function GhostNPC({ ghost, ghosts }: GhostProps) {
  switch (ghost.ghostType) {
    case 'red':
      return <RedGhost ghost={ghost} />;
    case 'inky':
      return <InkyGhost ghost={ghost} ghosts={ghosts} />;
    case 'clyde':
      return <ClydeGhost ghost={ghost} />;
    default:
      return null;
  }
}
