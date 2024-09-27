import styled, { css } from 'styled-components';

interface StyledGhostProps {
  scatter: boolean;
  color: string;
}

export const GhostStyled = styled.div<StyledGhostProps>`
  width: 50px;
  height: 50px;
  background-color: ${({ scatter, color }) => (scatter ? 'white' : color)};
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
