import { createContext, useEffect, useState } from "react";

export const GameContext = createContext();

export default function GameContextProvider(props) {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
  const value = {
    mode,
    setMode,
  };
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);
  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}
