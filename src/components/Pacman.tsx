import React from 'react';
import styled from 'styled-components';

const PacmanStyled = styled.div<{ direction: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: yellow;
  clip-path: ${(props) =>
    props.direction === 'RIGHT'
      ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      : props.direction === 'LEFT'
      ? 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)'
      : props.direction === 'UP'
      ? 'polygon(50% 50%, 100% 0%, 50% 100%, 0% 0%)'
      : 'polygon(50% 50%, 100% 100%, 50% 0%, 0% 100%)'};
`;

interface PacmanProps {
  direction: string;
}

const Pacman: React.FC<PacmanProps> = ({ direction }) => {
  return <PacmanStyled direction={direction} />;
};

export default Pacman;
