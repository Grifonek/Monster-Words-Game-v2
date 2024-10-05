import { useEffect } from "react";

import Button from "./Button";

interface WelcomeModalWindowTypes {
  setShowModal: (value: boolean) => void;
}

function WelcomeModalWindow({ setShowModal }: WelcomeModalWindowTypes) {
  useEffect(() => {
    function handleModalClose(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "escape") {
        setShowModal(false);
      }
    }

    window.addEventListener("keydown", handleModalClose);

    return () => {
      window.removeEventListener("keydown", handleModalClose);
    };
  }, [setShowModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 [word-spacing:5px]">
      <div className="bg-white border-black border-4 rounded-lg shadow-xl p-8 max-w-lg text-center space-y-3 relative dark:bg-black dark:border-white">
        <h1 className="text-4xl font-bold mb-4">Game Instructions</h1>
        <h2 className="text-2xl text-gray-700">
          Welcome to the Monster Words Game!
        </h2>
        <h2 className="text-lg text-gray-700">Here's how to play:</h2>
        <ul className="list-disc list-inside text-left space-y-2">
          <li>Type the word each monster carries to defeat them.</li>
          <li>
            Press 'Escape' to clear any mistakes and start typing again. You can
            see your typed word at the top of the page.
          </li>
          <li>Don’t let the monsters reach the end, or you'll lose!</li>
          <li>
            The faster you will be, the chance to kill all monsters before they
            even spawn is higher!
          </li>
        </ul>
        <h2 className="text-2xl">Enjoy the game!</h2>
        <h2 className="text-sm">And Quake sound effects ツ</h2>
        <Button
          refference={false}
          text="Close"
          handleClick={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}

export default WelcomeModalWindow;
