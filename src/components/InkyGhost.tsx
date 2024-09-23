import styled from 'styled-components';

const Ghost = styled.div`
  width: 50px;
  height: 50px;
  background-color: blue;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

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
`;

function InkyGhost() {
  return <Ghost />;
}

export default InkyGhost;
