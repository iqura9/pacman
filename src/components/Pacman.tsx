import React from "react";

const Pacman: React.FC = () => {
  const pacmanStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "yellow",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  };

  return <div style={pacmanStyle}></div>;
};

export default Pacman;
