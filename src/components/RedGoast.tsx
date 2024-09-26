import React from 'react';
import styled, { css } from 'styled-components';
import { useTimer } from '../contexts';

interface GhostProps {
  scatter: boolean;
}

const Ghost = styled.div<GhostProps>`
  width: 50px;
  height: 50px;
  background-color: ${({ scatter }) => (scatter ? 'white' : 'red')};
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 15px;
  }

  &:after {
    content: '';
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 15px;
  }

  ${({ scatter }) =>
    scatter &&
    css`
      box-shadow: 0 0 15px rgba(0, 0, 255, 0.5);
    `}
`;

const RedGhost: React.FC = () => {
  const { mode } = useTimer();
  const isScatter = mode === 'scatter';

  return <Ghost scatter={isScatter} />;
};

export default RedGhost;
