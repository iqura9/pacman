import React, { useState } from "react";
import { CenterContainer, PlayButton } from "./components/PlayButton";
import { Play } from "./components/Play";

const App: React.FC = () => {
  const [isPlay, setIsPlay] = useState(false);

  if (!isPlay) return <PlayButton onClick={() => setIsPlay(true)} />;

  return (
    <CenterContainer>
      <Play />
    </CenterContainer>
  );
};

export default App;
