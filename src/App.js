import { useEffect, useRef, useState } from "react";
import GameStart from "./components/GameStart";
import GameEnd from "./components/GameEnd";
import GamePlay from "./components/GamePlay";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector } from "./redux/Selectors/gameSelector";
import { setGameState } from "./redux/Slices/gameSlice";

/*add : user activity tracker , capsLock tracker... */
function App() {
  const dispatch = useDispatch();
  // since we'll have issues if we add a timer and the scoreBoard changing fastly in the store , we'll make a local timer
  const [localTimer, setLocalTimer] = useState(null);
  const localTimerInterval = useRef(null);
  const startTimer = () => {
    localTimerInterval.current = setInterval(() => {
      setLocalTimer((prevTime) => prevTime - 1);
    }, 1000);
  };
  useEffect(() => {
    if (localTimer === 0) {
      clearInterval(localTimerInterval.current);
      dispatch(setGameState("gameEnd"));
    }
  }, [localTimer]);

  const game = useSelector(gameSelector);

  let Display;
  switch (game.state) {
    case "gamePlay":
      Display = <GamePlay localTimer={localTimer} />;
      break;
    case "gameEnd":
      Display = <GameEnd mainTimer={game.timer} />;
      break;
    default:
      Display = (
        <GameStart startTimer={startTimer} setLocalTimer={setLocalTimer} />
      );
  }

  return (
    <div className="App d-flex flex-column justify-content-center align-items-center">
      {Display}
    </div>
  );
}

export default App;
