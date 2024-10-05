import { useEffect, useState } from "react";

import Game from "./Components/Game";
import Welcome from "./Components/Welcome";
import SmallScreenAlert from "./Components/SmallScreenAlert";

function App() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [words, setWords] = useState<string>(() => {
    const savedWords = localStorage.getItem("savedWords");

    return savedWords ? JSON.parse(savedWords) : "animals";
  });
  const [togglePlaySound, setTogglePlaySound] = useState<boolean>(() => {
    const savedSound = localStorage.getItem("savedSound");

    return savedSound === "true";
  });
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen dark:bg-black dark:text-white">
      {isSmallScreen ? (
        <SmallScreenAlert />
      ) : (
        <>
          {startGame ? (
            <Game words={words} togglePlaySound={togglePlaySound} />
          ) : (
            <Welcome
              words={words}
              setWords={setWords}
              setStartGame={setStartGame}
              togglePlaySound={togglePlaySound}
              setTogglePlaySound={setTogglePlaySound}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
