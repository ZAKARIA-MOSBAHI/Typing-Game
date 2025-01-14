import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import TypingTest from "./components/Typing Test/TypingTest";
import TimePicker from "./components/Time Picker/TimePicker";
import LangPicker from "./components/Lang Picker/LangPicker";
import Timer from "./components/Timer/Timer";
import Results from "./components/Results/Results";
import { faker, fakerFR } from "@faker-js/faker";
import Reload from "./components/Options/Reload";
import ActivityTracker from "./components/ActivityTracker/ActivityTracker";

/*add : user activity tracker , capsLock tracker... */
function App() {
  // getting the app so we can add blur to it
  // const appRef = useRef();
  // we added all the states here ,to reset them all at once when replaying
  const [scoreBoard, setScoreBoard] = useState({
    typedCharacters: 0,
    accuracy: 0,
    mistakes: 0,
    correctCharacters: 0,
    wpm: 0,
  });
  // fnc that calculate the wpm
  const calculateWpm = (time) => {
    const wpm = Math.round(scoreBoard.typedCharacters / 5 / (time / 60));
    return wpm;
  };
  const calculateAccuracy = () => {
    const accuracy = Math.round(
      (scoreBoard.correctCharacters / scoreBoard.typedCharacters) * 100
    );
    return accuracy;
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
  // func that resets everything for a new game
  const newGame = () => {
    setLocalTimer(15);
    setScoreBoard({
      typedCharacters: 0,
      accuracy: 0,
      mistakes: 0,
      correctCharacters: 0,
      wpm: 0,
    });
    setCharIs([]);
    setCharIndex(0);
    setWordsList(generateWords(language));
  };

  // since we'll have issues if we add a timer and the scoreBoard changing fastly in the store , we'll make a local timer
  const [localTimer, setLocalTimer] = useState(15);
  // we will need it to store the value that is set by the user
  const localTimerRef = useRef(15);

  const localTimerInterval = useRef(null);
  const startTimer = () => {
    localTimerInterval.current = setInterval(() => {
      setLocalTimer((prevTime) => prevTime - 1);
    }, 1000);
  };

  useEffect(() => {
    if (localTimer === 0) {
      //stop the timer
      clearInterval(localTimerInterval.current);
      setScoreBoard((prevBoard) => {
        return {
          ...prevBoard,
          wpm: calculateWpm(localTimerRef.current),
          accuracy: calculateAccuracy(),
        };
      });
    }
  }, [localTimer]);

  useEffect(() => {
    setWordsList(generateWords(language));
  }, [language]);
  return (
    <div
      className={`App d-flex flex-column justify-content-center align-items-center ${styles.App}`}
    >
      <ActivityTracker />
      <div className={` ${styles.controls}`}>
        <LangPicker Language={language} setLanguage={setLanguage} />
        <Timer localTimer={localTimer} />
        <TimePicker
          localTimerRef={localTimerRef}
          localTimer={localTimer}
          setLocalTimer={setLocalTimer}
        />
      </div>
      <TypingTest
        startTimer={startTimer}
        Language={language}
        localTimer={localTimer}
        setScoreBoard={setScoreBoard}
        setCharIs={setCharIs}
        charIs={charIs}
        wordsList={wordsList}
        setWordsList={setWordsList}
        charIndex={charIndex}
        setCharIndex={setCharIndex}
      />
      <Reload newGame={newGame} />
      {localTimer === 0 && (
        <Results scoreBoard={scoreBoard} newGame={newGame} />
      )}
    </div>
  );
}

export default App;
