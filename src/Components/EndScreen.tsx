import formatTime from "../Functions/formatTime";

import Button from "./Button";

interface EndScreenType {
  totalKilledMonsters: number;
  totalTime: number;
  text: string;
}

function EndScreen({ totalKilledMonsters, totalTime, text }: EndScreenType) {
  function handlePageRefresh() {
    window.location.reload();
  }
  return (
    <div className="flex flex-col text-center items-center py-10 gap-y-5">
      <h1 className="text-6xl [word-spacing:10px]">{text}!</h1>
      <h2 className="text-3xl [word-spacing:5px]">
        Total killed monsters: {totalKilledMonsters}
      </h2>
      <h2 className="text-3xl [word-spacing:5px]">
        Time: {formatTime(totalTime)}
      </h2>

      <Button
        handleClick={handlePageRefresh}
        text="GO BACK TO MENU"
        refference={false}
      />
    </div>
  );
}

export default EndScreen;
