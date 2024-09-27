import { Ghost } from './Board';
import ClydeGhost from './ClydeGhost';
import InkyGhost from './InkyGhost';
import { Coords } from './Play';
import RedGhost from './RedGoast';

export interface GhostProps {
  ghost: Ghost;
  ghosts?: Ghost[];
  updateGhostPosition: (id: string, newCoords: Coords) => void;
}

export function GhostNPC({ ghost, updateGhostPosition, ghosts }: GhostProps) {
  switch (ghost.ghostType) {
    case 'red':
      return (
        <RedGhost ghost={ghost} updateGhostPosition={updateGhostPosition} />
      );
    case 'inky':
      return (
        <InkyGhost
          ghost={ghost}
          updateGhostPosition={updateGhostPosition}
          ghosts={ghosts}
        />
      );
    case 'clyde':
      return (
        <ClydeGhost ghost={ghost} updateGhostPosition={updateGhostPosition} />
      );
    default:
      return null;
  }
}
