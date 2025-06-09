import { useContext, useEffect, useRef, useState } from "react";
import TypingTest from "./components/Typing Test/TypingTest";
import TimePicker from "./components/Time Picker/TimePicker";
import LangPicker from "./components/Lang Picker/LangPicker";
import Timer from "./components/Timer/Timer";
import Results from "./components/Results/Results";
import Reload from "./components/Options/Reload";
import ThemeChanger from "./components/ThemeChanger/ThemeChanger";
import { AnimatePresence, motion } from "framer-motion";
import { generateWords } from "./utils/generateWords";
import { calculateWpm } from "./utils/calculateWpm";
import { GameContext } from "./context/GameContext";

function App() {
  const {
    finishedWords,
    setFinishedWords,
    scoreBoard,
    setScoreBoard,
    charIs,
    setCharIs,
    wordsList,
    setWordsList,
    charIndex,
    setCharIndex,
    language,

    localTimer,
    setLocalTimer,
  } = useContext(GameContext);
  const localTimerInterval = useRef(null);
  // we will need it to store the value that is set by the user
  const localTimerRef = useRef(15);
  const timeRef = useRef(0);

  const CorrectCharsRef = useRef(0);
  const typedCharactersRef = useRef(0);
  const mistakesRef = useRef(0);

  const startTimer = () => {
    localTimerInterval.current = setInterval(() => {
      const currentMistakes = mistakesRef.current;
      const correctChars = CorrectCharsRef.current;
      const typedChars = typedCharactersRef.current;
      const currentWpm = calculateWpm(
        timeRef.current,
        typedCharactersRef.current
      );
      setScoreBoard((prevBoard) => [
        ...prevBoard,
        {
          time: timeRef.current,
          mistakes: currentMistakes,
          wpm: currentWpm,
          correctChars: correctChars,
          typedChars: typedChars,
        },
      ]);
      setLocalTimer((prevTime) => prevTime - 1);
      timeRef.current += 1;
      mistakesRef.current = 0;
      CorrectCharsRef.current = 0;
    }, 1000);
  };
  // func that resets everything for a new game
  const newGame = () => {
    setLocalTimer(localTimerRef.current);
    setScoreBoard([]);
    setCharIs([]);
    setCharIndex(0);
    setWordsList(generateWords(language));
    timeRef.current = 0;
    CorrectCharsRef.current = 0;
    typedCharactersRef.current = 0;
    mistakesRef.current = 0;
  };
  useEffect(() => {
    if (localTimer === 0) {
      clearInterval(localTimerInterval.current);
    }
  }, [localTimer]);

  useEffect(() => {
    if (localTimerInterval.current) {
      clearInterval(localTimerInterval.current);
    }
    newGame();
  }, [language]);
  useEffect(() => {
    if (finishedWords) {
      setCharIs([]);
      setCharIndex(0);
      setWordsList(generateWords(language));
    }
    setFinishedWords(false);
  }, [finishedWords]);

  return (
    <div
      className={`transition-colors duration-200  relative bg-[#F5F5F5] dark:bg-[#111111] h-screen w-full `}
    >
      <AnimatePresence>
        {localTimer !== 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div
              className={`dark:bg-[#646464] bg-[#E0E0E0] my-4 rounded-lg max-w-[900px] w-full h-12 flex items-center justify-evenly    `}
            >
              <LangPicker />
              <Timer localTimer={localTimer} />
              <TimePicker
                localTimerRef={localTimerRef}
                setLocalTimer={setLocalTimer}
              />
              <ThemeChanger />
            </div>
            <TypingTest
              setFinishedWords={setFinishedWords}
              CorrectCharsRef={CorrectCharsRef}
              typedCharactersRef={typedCharactersRef}
              mistakesRef={mistakesRef}
              startTimer={startTimer}
              Language={language}
              localTimer={localTimer}
              setCharIs={setCharIs}
              charIs={charIs}
              wordsList={wordsList}
              charIndex={charIndex}
              setCharIndex={setCharIndex}
            />
            <Reload newGame={newGame} />
          </motion.div>
        )}
      </AnimatePresence>
      {localTimer === 0 && (
        <Results scoreBoard={scoreBoard} newGame={newGame} />
      )}
    </div>
  );
}

export default App;
