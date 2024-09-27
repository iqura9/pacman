import React, { createContext, useContext } from 'react';
import { Coords } from '../components/Play';

interface PacmanContextProps {
  pacmanPos: Coords;
  pacmanDirection: Coords;
  handleStopGame: () => void;
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
}) => {
  return (
    <Provider value={{ pacmanPos, pacmanDirection, handleStopGame }}>
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
