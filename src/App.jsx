import { useContext, useEffect, useRef, useState } from "react";
import TypingTest from "./components/Typing Test/TypingTest";
import TimePicker from "./components/Time Picker/TimePicker";
import LangPicker from "./components/Lang Picker/LangPicker";
import Timer from "./components/Timer/Timer";
import Results from "./components/Results/Results";
import { faker, fakerFR } from "@faker-js/faker";
import Reload from "./components/Options/Reload";
import ThemeChanger from "./components/ThemeChanger/ThemeChanger";
import { GameContext } from "./context/GameContext";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const { mode } = useContext(GameContext);
  const [finishedWords, setFinishedWords] = useState(false);
  const localTimerInterval = useRef(null);

  // we added all the states here ,to reset them all at once when replaying
  const [scoreBoard, setScoreBoard] = useState([]);
  // fnc that calculate the wpm
  const calculateWpm = (time, Chars) => {
    const timeInMinutes = time / 60;
    const words = Chars / 5;
    if (timeInMinutes > 0) {
      const wpm = Math.round(words / timeInMinutes);
      return wpm;
    } else return 0;
  };

  // charIs is used to store the values "correct" or "incorrect" for each char and it's index
  const [charIs, setCharIs] = useState([]);
  // wordsList will contain the characters that'll be later displayed for the user to type
  const [wordsList, setWordsList] = useState([]);
  // charIndex used to track every character in the wordsList
  const [charIndex, setCharIndex] = useState(0);
  // language used to determine the wordsList language
  const [language, setLanguage] = useState("English");
  // function that generate random words
  const generateWords = (Lang) => {
    let randomWordsList;
    switch (Lang) {
      case "French":
        randomWordsList = fakerFR.word.words(40).split("");
        break;
      default:
        randomWordsList = faker.word.words(40).split("");
    }
    return randomWordsList;
  };

  // since we'll have issues if we add a timer and the scoreBoard changing fastly in the store , we'll make a local timer
  const [localTimer, setLocalTimer] = useState(15);
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
      className={` ${mode} transition-colors duration-200  relative bg-[#F5F5F5] dark:bg-[#111111] h-screen w-full `}
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
              className={`dark:bg-[#646464] bg-[#E0E0E0] p-6 my-4 rounded-lg max-w-[900px] w-full h-8 flex items-center justify-evenly    `}
            >
              <LangPicker Language={language} setLanguage={setLanguage} />
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
