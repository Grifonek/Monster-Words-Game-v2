import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import firstMonster from "/monster1.png";
import secondMonster from "/monster2.png";
import thirdMonster from "/monster3.png";
import fourthMonster from "/monster4.png";

import Animals from "../Words/Animals";
import FruitAndVegetables from "../Words/Fruit&Vegetables";
import ProgrammingLanguages from "../Words/ProgrammingLanguages";

import EndScreen from "./EndScreen";
import GameWindow from "./GameWindow";
import NextLevel from "./NextLevel";

import combowhore from "../Music/Quake/combowhore.mp3";
import firstblood from "../Music/Quake/firstblood.mp3";
import holyshit from "../Music/Quake/holyshit.mp3";
import impressive from "../Music/Quake/impressive.mp3";
import killingspree from "../Music/Quake/killingspree.mp3";
import monsterkill from "../Music/Quake/monsterkill.mp3";
import gunshot from "../Music/Quake/Qtestguncock.mp3";
import unstoppable from "../Music/Quake/unstoppable.mp3";

export interface MonsterType {
  word: string;
  img: string;
  position: number;
  left: number;
  percentage: number;
}

export interface StatsType {
  killedMonsters: number;
  totalKilledMonsters: number;
  time: number;
  totalTime: number;
}

interface GameTypes {
  words: string;
  togglePlaySound: boolean;
}

function Game({ words, togglePlaySound }: GameTypes) {
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const [visibleMonsters, setVisibleMonsters] = useState<MonsterType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    killedMonsters: 0,
    totalKilledMonsters: 0,
    time: Date.now(),
    totalTime: Date.now(),
  });
  const [end, setEnd] = useState<boolean>(false);
  const [goToNextLevel, setGoToNextLevel] = useState<boolean>(false);
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | "impossible">(
    "easy"
  );
  const [userInput, setUserInput] = useState<string>("");

  const startLineRef = useRef<HTMLDivElement | null>(null);

  const allMonsters =
    level === "easy"
      ? 10
      : level === "medium"
      ? 15
      : level === "hard"
      ? 20
      : 25;

  const selectedWords = useMemo(() => {
    return words === "animals"
      ? Animals
      : words === "food"
      ? FruitAndVegetables
      : ProgrammingLanguages;
  }, [words]);

  useEffect(() => {
    generateMonsters();
  }, [level]);

  // GENERATING MONSTERS
  const generateMonsters = useCallback(() => {
    const monstersImg = [
      firstMonster,
      secondMonster,
      thirdMonster,
      fourthMonster,
    ];

    const newMonsters: MonsterType[] = [];

    for (let i = 0; i < allMonsters; i++) {
      const maxPosition = window.innerHeight - 100;
      const position = Math.floor(Math.random() * maxPosition);
      const img = monstersImg[Math.floor(Math.random() * monstersImg.length)];
      const word =
        selectedWords[Math.floor(Math.random() * selectedWords.length)];
      const percentage = Math.random() * 0.03 + 0.1; // THIS SETS SPEED OF EACH MONSTER

      newMonsters.push({ word, img, position, left: 0, percentage });
    }

    setMonsters(newMonsters);
    setVisibleMonsters([]);
  }, [selectedWords, allMonsters]);

  // RENDERING MONSTERS WITH A DELAY
  useEffect(() => {
    if (monsters.length === 0) return;

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < monsters.length) {
        const nextMonster = monsters[currentIndex];
        if (nextMonster) {
          setVisibleMonsters((prev) => [...prev, nextMonster]);
          currentIndex++;
        }
      } else {
        clearInterval(intervalId);
      }
    }, Math.random() * 1000 + 300);

    return () => clearInterval(intervalId);
  }, [monsters]);

  // MOVING MONSTERS TO THE RIGHT
  useEffect(() => {
    let animationId: number;

    const moveMonsters = () => {
      setVisibleMonsters((prevMonsters) => {
        const updatedMonsters = prevMonsters.map((monster) => ({
          ...monster,
          left: monster.left + monster.percentage,
        }));

        if (updatedMonsters.some((monster) => monster.left >= 100)) {
          gameEnd();

          if (togglePlaySound) {
            const audio = new Audio(holyshit);
            audio.play();
          }

          cancelAnimationFrame(animationId);
        }

        return updatedMonsters;
      });
    };

    const handleAnimation = () => {
      moveMonsters();
      animationId = requestAnimationFrame(handleAnimation);
    };

    animationId = requestAnimationFrame(handleAnimation);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // REMOVING MONSTER WHEN TYPED IT'S WORD
  const removeMonster = useCallback((word: string) => {
    setVisibleMonsters((prevVisibleMonsters) => {
      const newVisibleMonsters = prevVisibleMonsters.filter(
        (monster) => monster.word !== word
      );

      const beforeLength = prevVisibleMonsters.length;
      const afterLength = newVisibleMonsters.length;
      const res = beforeLength - afterLength;

      setStats((prevStats) => ({
        ...prevStats,
        killedMonsters: prevStats.killedMonsters + res,
        totalKilledMonsters: prevStats.totalKilledMonsters + res,
      }));

      if (newVisibleMonsters.length === 0) {
        setGoToNextLevel(true);

        setStats((prevStats) => ({
          ...prevStats,
          time: Math.floor((Date.now() - prevStats.time) / 1000),
        }));
      }

      return newVisibleMonsters;
    });
  }, []);

  // HAPPENS WHEN USER CLICKS NEXT LEVEL BUTTON
  function nextLevel() {
    setGoToNextLevel(false);

    setUserInput("");

    setStats((prevStats) => ({
      ...prevStats,
      killedMonsters: 0,
      time: Date.now(),
    }));

    if (level === "easy") {
      setLevel("medium");
    } else if (level === "medium") {
      setLevel("hard");
    } else if (level === "hard") {
      setLevel("impossible");
    } else if (level === "impossible") {
      gameEnd();
    }
  }

  // PLAYING SOUND WHEN MONSTERS ARE KILLED
  const sounds = {
    firstblood,
    killingspree,
    unstoppable,
    combowhore,
    impressive,
    monsterkill,
    gunshot,
  };

  // function playSound() {}
  const playSound = useCallback(() => {
    const threshold = [0, 4, 9, 14, 19, 24];
    const musicKeys: (keyof typeof sounds)[] = [
      "firstblood",
      "killingspree",
      "unstoppable",
      "combowhore",
      "impressive",
      "monsterkill",
    ];
    let musicKey: keyof typeof sounds = "gunshot";

    for (let i = 0; i < threshold.length; i++) {
      if (stats.killedMonsters === threshold[i]) {
        musicKey = musicKeys[i];
        break;
      }
    }

    const music = sounds[musicKey];

    if (music) {
      const audio = new Audio(music);
      audio
        .play()
        .catch((err) => console.error("Playing audio has failed:", err));
    }
  }, [stats.killedMonsters]);

  // HAPPENS WHEN GAME END
  function gameEnd() {
    setEnd(true);

    // NOW TOTAL TIME IS SET TO BE TIME FOR WHOLE GAME DURATION ALSO WITH NEXTLEVEL DISPLAYS
    const elapsedTime = (Date.now() - stats.totalTime) / 1000;

    setStats((prevStats) => ({
      ...prevStats,
      totalTime: elapsedTime,
    }));
  }

  // USER INPUT WITH PUSHING TYPED KEYS INTO IT
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === "escape") {
        setUserInput("");
        return;
      }

      if (
        e.code !== `Key${e.key.toUpperCase()}` &&
        pressedKey !== "z" &&
        pressedKey !== "y"
      ) {
        return;
      }

      setUserInput((prevInput) => prevInput + pressedKey);

      let matchedWord = null;

      for (let i = 0; i < visibleMonsters.length; i++) {
        if (userInput + pressedKey === visibleMonsters[i].word) {
          matchedWord = visibleMonsters[i].word;
          break;
        }
      }

      if (matchedWord) {
        removeMonster(matchedWord);

        if (togglePlaySound) {
          playSound();
        }

        setUserInput("");
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedWords, userInput]);

  return (
    <div>
      {end ? (
        <EndScreen
          totalKilledMonsters={stats.totalKilledMonsters}
          totalTime={stats.totalTime}
          text={level === "impossible" ? "YOU WON THE GAME" : "GAME OVER"}
        />
      ) : goToNextLevel ? (
        <NextLevel
          killedMonsters={stats.killedMonsters}
          time={stats.time}
          level={level}
          nextLevel={nextLevel}
          buttonText={level === "impossible" ? "Finish" : "Next level"}
        />
      ) : (
        <GameWindow
          startLineRef={startLineRef}
          userInput={userInput}
          visibleMonsters={visibleMonsters}
          stats={stats}
        />
      )}
    </div>
  );
}

export default Game;
