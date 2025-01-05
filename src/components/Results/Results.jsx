import React from "react";
import styles from "./Results.module.scss";
import { AnimatePresence, motion } from "framer-motion";
export default function Results({ scoreBoard, newGame }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        exit={{ opacity: 0, transition: { duration: 3 } }}
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
    </AnimatePresence>
  );
}
