import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TypewriterComponent from "typewriter-effect";
import {
  setDifficulty,
  setGameState,
  setLanguage,
} from "../redux/Slices/gameSlice";
import { scoreBoardSelector } from "../redux/Selectors/scoreBoardSelector";
import {
  setBoard,
  setCharacters,
  setMistakes,
  setWPM,
} from "../redux/Slices/scoreBoardSlice";
import { setCurrentCharIndex, setWordsList } from "../redux/Slices/wordsSlice";

export default function GameEnd({ mainTimer }) {
  const dispatch = useDispatch();
  const { board, mistakes, wpm, characters } = useSelector(scoreBoardSelector);

  const calculateWPM = (characters, timer) => {
    return Math.round(characters / 5 / (timer / 60));
  };
  useEffect(() => {
    dispatch(setCharacters(board.length));
    dispatch(setMistakes(board.filter((val) => val === "incorrect").length));
    // we used board.length instead of characters because characters is not updated in time
    let wpm = calculateWPM(board.length, mainTimer);
    dispatch(setWPM(wpm));
  }, []);

  // setting the scoreBoard to 0 , to start a new game
  const playAgain = () => {
    dispatch(setGameState("gameStart"));
    dispatch(setWordsList([]));
    dispatch(setCurrentCharIndex("reset"));
    dispatch(setCharacters(0));
    dispatch(setMistakes(0));
    dispatch(setWPM(0));
    dispatch(setBoard([]));
    dispatch(setDifficulty("normal"));
    dispatch(setLanguage("en"));
  };
  return (
    <div className="d-flex flex-column gap-2">
      <h1 className="p my-3">
        <TypewriterComponent
          options={{
            strings: ["Game Over."],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <p>and make {mistakes} Mistakes !</p>
      <p>and typed {characters} Characters !</p>
      <p>Your WPM is : {wpm} wpm .</p>
      <button className="btn" onClick={playAgain}>
        Play Again
      </button>
    </div>
  );
}
