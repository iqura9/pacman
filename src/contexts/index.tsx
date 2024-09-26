import React, { createContext, useContext, useEffect, useState } from 'react';

interface TimerContextProps {
  time: number;
  mode: string;
}

interface TimerProviderProps {
  children: React.ReactNode;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState('chase');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time % 10 === 0) {
      setMode((prevMode) => (prevMode === 'chase' ? 'scatter' : 'chase'));
    }
  }, [time]);

  return (
    <TimerContext.Provider value={{ time, mode }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
