import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GameInfoTypes {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

function GameInfo({ showModal, setShowModal }: GameInfoTypes) {
  return (
    <button onClick={() => setShowModal(!showModal)}>
      <FontAwesomeIcon className="size-10" icon={faInfoCircle} />
    </button>
  );
}

export default GameInfo;
