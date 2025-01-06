import React from "react";
import styles from "./Results.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import CountUpAnimation from "./components/CountUpAnimation";
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
          <CountUpAnimation
            targetValue={scoreBoard.typedCharacters}
            textBefore="You Typed :"
            textAfter="Characters !"
          />
          <CountUpAnimation
            targetValue={scoreBoard.mistakes}
            textBefore="You Typed :"
            textAfter="Mistakes !"
            delay={1.5}
          />
          <CountUpAnimation
            targetValue={scoreBoard.wpm}
            textBefore="Your WPM Is :"
            textAfter="WPM !"
            delay={2.5}
          />
          <CountUpAnimation
            targetValue={scoreBoard.accuracy}
            textBefore="You Have :"
            textAfter="% Accuracy !"
            delay={3.5}
          />
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
