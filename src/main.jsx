import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import GameContextProvider from "./context/GameContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </ThemeContextProvider>
);
