import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

function ThemeChanger() {
  const { mode, setMode } = useContext(GameContext);
  const changeTheme = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  return (
    <svg
      onClick={changeTheme}
      className="w-6 h-6 cursor-pointer group "
      viewBox="0 0 20 20"
      version="1.1"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-180.000000, -4199.000000)"
          className="dark:fill-[#3c3C3C] fill-[#808080] group-hover:fill-[#1E1E1E] dark:group-hover:fill-[#eeeeee] transition-all duration-300"
          fill="#ff0"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039"
              id="contrast-[#907]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ThemeChanger;
