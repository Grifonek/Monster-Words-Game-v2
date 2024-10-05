import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SmallScreenAlert() {
  return (
    <div className="flex flex-col items-center text-center p-4 [word-spacing:5px] space-y-4">
      <FontAwesomeIcon icon={faExclamationTriangle} className="size-20" />
      <h1 className="text-3xl">
        This app is designed for larger screen, not for mobiles!
      </h1>
      <h2 className="text-2xl">
        Please use a desktop or laptop to access this game.
      </h2>
    </div>
  );
}

export default SmallScreenAlert;
