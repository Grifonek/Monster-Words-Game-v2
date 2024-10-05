import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ToggleSoundButtonTypes {
  togglePlaySound: boolean;
  setTogglePlaySound: (value: boolean) => void;
}

function ToggleSoundButton({
  togglePlaySound,
  setTogglePlaySound,
}: ToggleSoundButtonTypes) {
  return (
    <button
      onClick={() => setTogglePlaySound(!togglePlaySound)}
      className="text-3xl"
    >
      <FontAwesomeIcon icon={togglePlaySound ? faVolumeUp : faVolumeMute} />
    </button>
  );
}

export default ToggleSoundButton;
