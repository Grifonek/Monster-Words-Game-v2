interface MonsterProps {
  src: string;
  word: string;
  position: number;
  left: number;
}

function Monster({ src, word, position, left }: MonsterProps) {
  return (
    <div
      className="absolute flex flex-col items-center size-20"
      style={{ top: `${position}px`, left: `${left}%` }}
    >
      <p className="text-xl">{word}</p>
      <img src={src} />
    </div>
  );
}

export default Monster;
