import { useEffect, useRef } from "react";

interface ButtonTypes {
  refference: boolean;
  handleClick: () => void;
  text: string;
}

function Button({ handleClick, text, refference }: ButtonTypes) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    btnRef.current?.focus();
  }, []);

  return (
    <button
      className="text-4xl border border-black w-fit px-3 [letter-spacing:2px] transform transition-transform duration-200 ease-in-out hover:scale-95 active:scale-90 active:translate-y-1 relative
        before:absolute before:inset-0 before:border-black before:pointer-events-none focus:shadow-[0_0_0_5px_rgba(55,65,81,0.4)] focus:border-4 focus:outline-none dark:bg-slate-600 dark:border-white"
      onClick={() => handleClick()}
      ref={refference ? btnRef : null}
    >
      {text}
    </button>
  );
}

export default Button;
