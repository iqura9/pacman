import styled from "styled-components";

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black; // Optional: sets background for the whole app
`;

const PacmanButton = styled.div`
  width: 100px;
  height: 100px;
  background-color: yellow;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  /* Create the "mouth" effect */
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);

  &:hover {
    transform: scale(1.1);
  }

  /* Pacman's eye */
  &::before {
    content: "";
    position: absolute;
    top: 25px;
    left: 40px;
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
  }
`;

export function PlayButton({ onClick }: { onClick: () => void }) {
  return (
    <CenterContainer>
      <PacmanButton onClick={onClick} />
    </CenterContainer>
  );
}
