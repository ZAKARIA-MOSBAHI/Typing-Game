import { createContext, useMemo, useState } from "react";

export const GameContext = createContext();

export default function GameContextProvider({ children }) {
  const [finishedWords, setFinishedWords] = useState(false);
  // we added all the states here ,to reset them all at once when replaying
  const [scoreBoard, setScoreBoard] = useState([]);
  // charIs is used to store the values "correct" or "incorrect" for each char and it's index
  const [charIs, setCharIs] = useState([]);
  // wordsList will contain the characters that'll be later displayed for the user to type
  const [wordsList, setWordsList] = useState([]);
  // charIndex used to track every character in the wordsList
  const [charIndex, setCharIndex] = useState(0);
  // language used to determine the wordsList language
  const [language, setLanguage] = useState("English");
  // since we'll have issues if we add a timer and the scoreBoard changing fastly in the store , we'll make a local timer
  const [localTimer, setLocalTimer] = useState(15);

  const value = useMemo(
    () => ({
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
      setLanguage,
      localTimer,
      setLocalTimer,
    }),
    [
      finishedWords,
      scoreBoard,
      charIs,
      wordsList,
      charIndex,
      language,
      localTimer,
    ]
  );
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
