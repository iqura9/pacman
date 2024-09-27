import React, { useState } from 'react';
import { Play } from './components/Play';
import { CenterContainer, PlayButton } from './components/PlayButton';
import { Timer } from './components/Timer';

const App: React.FC = () => {
  const [isPlay, setIsPlay] = useState(false);
  if (!isPlay) return <PlayButton onClick={() => setIsPlay(true)} />;

  return (
    <>
      <Timer />
      <CenterContainer>
        <Play />
      </CenterContainer>
    </>
  );
};

export default App;
