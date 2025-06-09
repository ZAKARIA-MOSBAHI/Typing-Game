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
    <Moon size={24} onClick={changeTheme} className="cursor-pointer" />
  ) : (
    <Sun size={24} onClick={changeTheme} className="cursor-pointer" />
  );
}

export default ThemeChanger;
