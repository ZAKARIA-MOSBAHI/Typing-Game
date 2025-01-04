//error to be solved : it returns an error if the word is one letter like ("a")
import React, { useEffect, useRef } from "react";
import ActivityTracker from "../ActivityTracker";

export default function TypingTest({
  startTimer,
  localTimer,
  setScoreBoard,
  wordsList,
  charIndex,
  setCharIndex,
  charIs,
  setCharIs,
}) {
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

  const InputElem = useRef();

  useEffect(() => {
    if (localTimer === 0) {
      //disable the input so the user will not type
      InputElem.current.value = "";
    }
  }, [localTimer]);
  const handleChange = (e) => {
    let value = e.key; // to get the last letter of the input value

    const letterExpected = lettersRef.current[charIndex];
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
    if (letterExpected.textContent === value) {
      // scoreBoardRef.current[charIndex] = "correct";

      setCharIs((prevState) => {
        const updatedChar = [...prevState];
        updatedChar[charIndex] = "correct";
        return updatedChar;
      });

      setCharIndex((prevChar) => prevChar + 1);
    } else {
      setCharIs((prevState) => {
        const updatedChar = [...prevState];
        updatedChar[charIndex] = "incorrect";
        return updatedChar;
      });
      setScoreBoard((prevState) => ({
        ...prevState,
        mistakes: prevState.mistakes + 1,
      }));
      setCharIndex((prevChar) => prevChar + 1);
    }
    setScoreBoard((prevState) => ({
      ...prevState,
      typedCharacters: prevState.typedCharacters + 1,
    }));
  };

  return (
    <>
      <div className="game w-75 d-flex flex-column  gap-2 mx-auto">
        <div className="words">
          {wordsList.map((char, index) => {
            return (
              <span
                key={index}
                className={`char  ${
                  /*if the index equals the index set in the state it means that this letter is the one to be typed */
                  charIndex === index ? "current" : ""
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
              </span>
            );
          })}
        </div>
        {/*INPUT DIV*/}
        <div className="user-input w-50 mx-auto ">
          <div className="textInputWrapper">
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
        </div>
        {/*OPTIONS DIV*/}
        <div className="options d-flex mx-auto"></div>
      </div>
    </>
  );
}
