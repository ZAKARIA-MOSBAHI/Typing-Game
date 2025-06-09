import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

function ThemeChanger() {
  const { mode, setMode } = useContext(ThemeContext);
  const changeTheme = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  return mode === "light" ? (
    <Moon onClick={changeTheme} className="w-6 cursor-pointer" />
  ) : (
    <Sun onClick={changeTheme} className=" w-6 cursor-pointer" />
  );
}

export default ThemeChanger;
