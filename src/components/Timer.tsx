import React from 'react';
import styled from 'styled-components';
import { useTimer } from '../contexts';

const TimerWrapper = styled.div`
  background-color: #282c34;
  color: #61dafb;
  padding: 10px;
  border-radius: 8px;
  font-size: 20px;
  text-align: center;
  width: 150px;
  margin: 0 auto;
`;

export const Timer: React.FC = () => {
  const { time, mode } = useTimer();
  return (
    <TimerWrapper>
      Time: {time} seconds, mode: {mode}
    </TimerWrapper>
  );
};
