import React, { createContext, useContext, useEffect, useState } from 'react';

interface TimerContextProps {
  time: number;
  mode: string;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handleStopeTimer: () => void;
}

interface TimerProviderProps {
  children: React.ReactNode;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState('chase');
  const [clearTimer, setClearTimer] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    if (clearTimer) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [clearTimer]);

  useEffect(() => {
    if (time % 10 === 0) {
      setMode((prevMode) => (prevMode === 'chase' ? 'scatter' : 'chase'));
    }
  }, [time]);

  const handleStopeTimer = () => {
    setClearTimer(true);
  };

  return (
    <TimerContext.Provider
      value={{ time, mode, level, setLevel, handleStopeTimer }}
    >
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
