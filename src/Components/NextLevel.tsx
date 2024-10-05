import { useEffect, useRef } from "react";

import formatTime from "../Functions/formatTime";

import Button from "./Button";

interface NextLevelType {
  killedMonsters: number;
  time: number;
  level: string;
  nextLevel: () => void;
  buttonText: string;
}

function NextLevel({
  killedMonsters,
  time,
  level,
  nextLevel,
  buttonText,
}: NextLevelType) {
  const myButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    myButton.current?.focus();
  }, []);

  return (
    <div className="flex flex-col text-center items-center py-10 gap-y-5">
      <h1 className="text-6xl [word-spacing:10px]">
        YOU HAVE BEATEN {level} level!
      </h1>
      <h2 className="text-3xl [word-spacing:5px]">
        Killed monsters this round: {killedMonsters}
      </h2>
      <h2 className="text-3xl [word-spacing:5px]">
        Time of this round: {formatTime(time)}
      </h2>

      <Button handleClick={nextLevel} text={buttonText} refference={true} />
    </div>
  );
}

export default NextLevel;
