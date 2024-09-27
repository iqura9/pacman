import React, { createContext, useContext } from 'react';
import { Coords } from '../components/Play';

interface PacmanContextProps {
  pacmanPos: Coords;
  pacmanDirection: Coords;
  handleStopGame: (id: string) => void;
  updateGhostPosition: (id: string, newCoords: Coords) => void;
  addGhost: (type: 'red' | 'inky' | 'clyde', coords: Coords) => void;
  removeGhost: (id: string) => void;
}

type PacmanProviderProps = {
  children: React.ReactNode;
} & PacmanContextProps;

const PacmanContext = createContext<PacmanContextProps | undefined>(undefined);

const { Provider } = PacmanContext;

export const PacmanProvider: React.FC<PacmanProviderProps> = ({
  children,
  pacmanPos,
  pacmanDirection,
  handleStopGame,
  updateGhostPosition,
  addGhost,
  removeGhost,
}) => {
  return (
    <Provider
      value={{
        pacmanPos,
        pacmanDirection,
        handleStopGame,
        updateGhostPosition,
        addGhost,
        removeGhost,
      }}
    >
      {children}
    </Provider>
  );
};

export const usePacmanData = (): PacmanContextProps => {
  const context = useContext(PacmanContext);
  if (!context) {
    throw new Error('usePacmanData must be used within a PacmanProvider');
  }
  return context;
};
