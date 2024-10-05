import { useEffect, useState } from "react";

import prepare from "../Music/Quake/prepare.mp3";
import Button from "./Button";
import GameInfo from "./GameInfo";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import ToggleSoundButton from "./ToggleSoundButton";
import WelcomeModalWindow from "./WelcomeModalWindow";
import Footer from "./Footer";

interface WelcomeProps {
  words: string;
  setWords: (value: string) => void;
  setStartGame: (value: boolean) => void;
  togglePlaySound: boolean;
  setTogglePlaySound: (value: boolean) => void;
}

function Welcome({
  words,
  setWords,
  setStartGame,
  togglePlaySound,
  setTogglePlaySound,
}: WelcomeProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const savedSound = localStorage.getItem("savedSound");

    if (savedSound !== JSON.stringify(togglePlaySound)) {
      localStorage.setItem("savedSound", JSON.stringify(togglePlaySound));
    }
  }, [togglePlaySound]);

  useEffect(() => {
    const savedWords = localStorage.getItem("savedWords");

    if (savedWords !== JSON.stringify(words)) {
      localStorage.setItem("savedWords", JSON.stringify(words));
    }
  }, [words]);

  function handleStartButtonClick() {
    if (togglePlaySound) {
      const audio = new Audio(prepare);
      audio.play();
    }

    setStartGame(true);
  }

  return (
    <div className="flex flex-col text-center items-center py-10 gap-y-5 h-screen">
      <h1 className="text-6xl [word-spacing:10px]">
        WELCOME TO MY MONSTER WORDS GAME!
      </h1>

      <h2 className="text-3xl text-gray-500 [word-spacing:5px] w-3/4">
        "Your mission is simple: kill every last one of those bloodthirsty
        monsters. But how do you do it? Each monster carries a word, and your
        job is to type it out. Make a typo? No problem—just hit 'Escape' and try
        again. But be careful, don’t let them reach the end!"
      </h2>
      <h3 className="text-2xl [word-spacing:2px]">
        MAX, THE KING OF THIS GAME
      </h3>

      <div className="flex space-x-4 text-xl [word-spacing:2px]">
        <div className="space-x-3">
          <label htmlFor="words">Select words:</label>
          <select
            name="words"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            className="p-1 border border-black dark:bg-slate-600 dark:border-white"
          >
            <option value="animals">Animals</option>
            <option value="food">Food</option>
            <option value="programming">Programming</option>
          </select>
        </div>
      </div>

      <Button
        refference={false}
        text="Start game"
        handleClick={handleStartButtonClick}
      />

      <div className="absolute right-5 bottom-5 flex flex-col gap-y-4">
        <ToggleDarkModeButton />
        <ToggleSoundButton
          setTogglePlaySound={setTogglePlaySound}
          togglePlaySound={togglePlaySound}
        />
        <GameInfo showModal={showModal} setShowModal={setShowModal} />
      </div>

      <Footer />

      {showModal && <WelcomeModalWindow setShowModal={setShowModal} />}
    </div>
  );
}

export default Welcome;
