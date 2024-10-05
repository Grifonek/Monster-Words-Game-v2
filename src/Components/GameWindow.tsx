import { RefObject } from "react";

import { MonsterType, StatsType } from "./Game";
import Monster from "./Monster";
import StartingLine from "./StartingLine";
import WordPanel from "./WordPanel";

interface GameWindowTypes {
  startLineRef: RefObject<HTMLDivElement>;
  userInput: string;
  visibleMonsters: MonsterType[];
  stats: StatsType;
}

function GameWindow({
  startLineRef,
  userInput,
  visibleMonsters,
  stats,
}: GameWindowTypes) {
  return (
    <div className="overflow-hidden">
      <StartingLine ref={startLineRef} />
      <WordPanel word={userInput} />
      {visibleMonsters.map(
        (e, index) =>
          e && (
            <Monster
              key={index}
              src={e.img}
              word={e.word}
              position={e.position}
              left={e.left}
            />
          )
      )}
      <h1 className="absolute right-0 top-0 text-2xl [letter-spacing:2px]">
        Score: {stats.killedMonsters}
      </h1>
    </div>
  );
}

export default GameWindow;
