interface WordPanelTypes {
  word: string;
}

function WordPanel({ word }: WordPanelTypes) {
  return (
    <div className="absolute text-center right-0 left-0 top-0 text-3xl [letter-spacing:5px]">
      {word}
    </div>
  );
}

export default WordPanel;
