import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import TypewriterComponent from "typewriter-effect";
import { setTimer, setGameState } from "../redux/Slices/gameSlice";

export default function GameStart({ startTimer, setLocalTimer }) {
  const dispatch = useDispatch();
  const startBtn = useRef();

  const ChooseTime = (value) => {
    setLocalTimer(value);
    dispatch(setTimer(value));
    startBtn.current.classList.remove("disabled");
  };

  const StartTheGame = () => {
    startTimer();
    dispatch(setGameState("gamePlay"));
  };

  return (
    <div className="d-flex flex-column justify-content-center gap-3 w-50 align-items-center mx-auto">
      <div>
        <h1 className="p">
          <TypewriterComponent
            options={{
              strings: ["Typing game."],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
      </div>
      <p className="p mono">Choose time : </p>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn "
          onClick={() => {
            ChooseTime(15);
          }}
        >
          15 Seconds
        </button>
        <button
          type="button"
          className="btn "
          data-testid="timerBtn"
          onClick={() => {
            ChooseTime(30);
          }}
        >
          30 Seconds
        </button>
        <button
          type="button"
          className="btn "
          onClick={() => {
            ChooseTime(60);
          }}
        >
          60 Seconds
        </button>
      </div>
      <button
        className="btn disabled"
        ref={startBtn}
        data-testid="startBtn"
        onClick={() => {
          StartTheGame();
        }}
      >
        Start Game
      </button>
    </div>
  );
}
