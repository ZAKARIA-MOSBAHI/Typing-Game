import { useContext, useEffect, useRef } from "react";
import "./InputStyle.css";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { GameContext } from "../../context/GameContext";
export default function TypingTest({
  CorrectCharsRef,
  typedCharactersRef,
  mistakesRef,
  startTimer,
}) {
  const { mode } = useContext(ThemeContext);
  const {
    setFinishedWords,
    language,
    localTimer,
    wordsList,
    charIndex,
    setCharIndex,
    charIs,
    setCharIs,
  } = useContext(GameContext);
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        duration: 0.02,
        delay: i * 0.02,
      },
    }),
  };
  const skippableKeys = [
    "Control",
    "Alt",
    "Shift",
    "Meta",
    "Tab",
    "Escape",
    "Capslock",
  ];
  // contains the span elem of each char , so we can control it
  const lettersRef = useRef([]);
  const ParentContainerRef = useRef(null);
  const containerRef = useRef(null);
  const InputElem = useRef(null);
  useEffect(() => {
    if (InputElem.current) {
      InputElem.current.focus();
    }
  }, []);
  useEffect(() => {
    if (InputElem.current) {
      InputElem.current.value = "";
    }
  }, [language]);
  useEffect(() => {
    if (localTimer === 0) {
      InputElem.current.value = "";
    }
  }, [localTimer]);
  const handleChange = (e) => {
    let value = e.key; // to get the last letter of the input value
    const letterExpected = lettersRef.current[charIndex];
    containerRef.current.style.top = `-${letterExpected.offsetTop}px`;

    // letterExpected.textContent = "hello"; => you can add content if the key needed is space but user puts chars
    const previousLetter = lettersRef.current[charIndex - 1];
    if (skippableKeys.includes(value)) {
      return; // not to count the skippable keys
    }
    if (charIndex === 0) {
      //means the user first typed a letter
      startTimer();
    }

    if (value === " ") {
      InputElem.current.value = "";
    }
    if (value === "Backspace") {
      if (charIndex === 0) {
        return; // not to decrement when the user is at the start
      }
      previousLetter.classList.contains("correct")
        ? previousLetter.classList.remove("correct")
        : previousLetter.classList.remove("incorrect");

      setCharIs((prevState) => {
        const updatedChar = [...prevState];
        updatedChar[charIndex - 1] = "";
        return updatedChar;
      });
      setCharIndex((prevChar) => prevChar - 1);
      return;
    }
    if (charIndex === lettersRef.current.length) {
      console.log("end of letters");
      setFinishedWords(true);
      return;
    }
    if (letterExpected.textContent === value) {
      setCharIs((prevState) => {
        const updatedChar = [...prevState];
        updatedChar[charIndex] = "correct";
        return updatedChar;
      });

      setCharIndex((prevChar) => prevChar + 1);
      CorrectCharsRef.current += 1;
    } else {
      mistakesRef.current += 1;
      setCharIs((prevState) => {
        const updatedChar = [...prevState];
        updatedChar[charIndex] = "incorrect";
        return updatedChar;
      });
      setCharIndex((prevChar) => prevChar + 1);
    }
    typedCharactersRef.current += 1;
  };

  return (
    <div className="max-w-[850px] w-full flex flex-col items-center justify-center px-4 sm:px-0  gap-2 sm:mx-auto">
      <div ref={ParentContainerRef} className="h-[100px] overflow-hidden my-12">
        <div
          ref={containerRef}
          className="px-4 transition-all duration-500 relative w-full text-lg sm:text-xl md:text-2xl  lg:text-[32px]  font-medium tracking-wider  text-[#808080] dark:text-[#444444] rounded-xl select-none"
        >
          {wordsList.length !== 0 &&
            wordsList.map((char, index) => {
              return (
                <motion.span
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  key={index}
                  className={`char  ${
                    /*if the index equals the index set in the state it means that this letter is the one to be typed */
                    charIndex === index
                      ? mode === "light"
                        ? "current_dark"
                        : "current"
                      : ""
                  } ${
                    /* if the score is not set for the letter , we don't add any class
                   if it's set to "correct" we add the class "correct"
                   if it's set to "incorrect" we add the class "incorrect" */
                    charIs[index] === undefined ? "" : charIs[index]
                  }`}
                  ref={(spanElem) => {
                    /*since the element that have the ref attribute automatically can be passed as an arg for the callback */
                    lettersRef.current[index] = spanElem;
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
        </div>
      </div>

      {/*INPUT DIV*/}
      <div className="w-1/2 mx-auto ">
        {mode === "dark" && (
          <div className="textInputWrapper ">
            <input
              type="text"
              className="textInput"
              ref={InputElem}
              onKeyDown={(e) => {
                handleChange(e);
              }}
              data-testid="user_input"
            />
          </div>
        )}
        {mode === "light" && (
          <div className="textInputWrapper_1 ">
            <input
              type="text"
              className="textInput_1"
              ref={InputElem}
              onKeyDown={(e) => {
                handleChange(e);
              }}
              data-testid="user_input"
            />
          </div>
        )}
      </div>
    </div>
  );
}
