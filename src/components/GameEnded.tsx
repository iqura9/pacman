import styled, { keyframes } from 'styled-components';

const PacManTextAnimation = keyframes`
  0%, 100% { color: yellow; }
  50% { color: orange; }
`;

const EndMessage = styled.div`
  font-size: 2rem;
  font-family: 'Press Start 2P', cursive;
  color: yellow;
  animation: ${PacManTextAnimation} 1s infinite;
  text-align: center;
  margin-top: 50px;
`;

const GameEnded = () => {
  return <EndMessage>Game Over!</EndMessage>;
};

export default GameEnded;
