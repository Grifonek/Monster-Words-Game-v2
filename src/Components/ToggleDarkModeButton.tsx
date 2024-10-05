import { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToggleDarkModeButton() {
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("toggleDarkMode");

    return savedMode === "true" ? true : false;
  });

  useEffect(() => {
    return () =>
      localStorage.setItem("toggleDarkMode", JSON.stringify(toggleDarkMode));
  }, [toggleDarkMode]);

  useEffect(() => {
    if (!toggleDarkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [toggleDarkMode]);

  return (
    <button
      onClick={() => {
        setToggleDarkMode(!toggleDarkMode);
      }}
      className="text-4xl"
    >
      {toggleDarkMode ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
}

export default ToggleDarkModeButton;
