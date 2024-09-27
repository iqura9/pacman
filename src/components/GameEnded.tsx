import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTimer } from '../contexts';

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

const InfoText = styled.p`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin: 20px 0;
`;

const RestartButton = styled.button`
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: orange;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 15%;
`;

type GameEndedProps = {
  onRestart: () => void;
};

const GameEnded = ({ onRestart }: GameEndedProps) => {
  const { time, level, handleStopeTimer } = useTimer();

  useEffect(() => {
    handleStopeTimer();
  }, [handleStopeTimer]);

  return (
    <Wrapper>
      <EndMessage>Game Over!</EndMessage>
      <InfoText>Level: {level}</InfoText>
      <InfoText>Time: {time} seconds</InfoText>
      <RestartButton onClick={onRestart}>Start Game Again</RestartButton>
    </Wrapper>
  );
};

export default GameEnded;
