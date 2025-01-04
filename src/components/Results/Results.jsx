import React from "react";
import styles from "./Results.module.scss";
import { motion } from "framer-motion";
export default function Results({
  setLocalTimer,
  setCharIs,
  scoreBoard,
  setScoreBoard,
  setCharIndex,
  setWordsList,
  generateWords,
}) {
  const newGame = () => {
    setLocalTimer(15);
    setScoreBoard({
      typedCharacters: 0,
      accuracy: 0,
      mistakes: 0,
      wpm: 0,
    });
    setCharIs([]);
    setCharIndex(0);
    setWordsList(generateWords());
  };
  return (
    <motion.div
      initial={{ opacity: 0, zIndex: -1 }}
      animate={{ opacity: 1, zIndex: 5 }}
      exit={{ opacity: 0, zIndex: -1 }}
      transition={{ duration: 0.5 }}
      className={` ${styles.ResultsContainer} `}
    >
      <div className={` ${styles.Results} `}>
        <h1 className="text-start  w-100 ">Results :</h1>
        <p>typed Chars : {scoreBoard.typedCharacters}</p>
        <p>mistakes : {scoreBoard.mistakes}</p>
        <button
          className={`btn btn-secondary ${styles.newGameBtn} `}
          onClick={newGame}
        >
          New Game
        </button>
      </div>
    </motion.div>
  );
}
