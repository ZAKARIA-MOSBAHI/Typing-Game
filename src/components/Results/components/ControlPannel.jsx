import Reload from "../../Options/Reload";

function ControlPannel({ newGame }) {
  return (
    <div className="dark:text-[#eeeeee]  w-full my-4 sm:my-12 flex items-center justify-center">
      <Reload newGame={newGame} />
    </div>
  );
}

export default ControlPannel;
