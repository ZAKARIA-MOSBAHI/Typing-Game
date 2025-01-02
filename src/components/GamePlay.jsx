//error to be solved : it returns an error if the word is one letter like ("a")
import React, { useEffect, useRef } from "react";
import Timer from "./Timer";
import ActivityTracker from "./ActivityTracker";
import { useDispatch, useSelector } from "react-redux";
import { wordsSelector } from "../redux/Selectors/wordsSelector";
import { faker } from "@faker-js/faker";
import { setCurrentCharIndex, setWordsList } from "../redux/Slices/wordsSlice";
import { setBoard } from "../redux/Slices/scoreSlice";

export default function GamePlay({ localTimer }) {
  const dispatch = useDispatch();
  const wordsState = useSelector(wordsSelector);

  const wordsList = wordsState.wordsList;
  const letterIndex = wordsState.currentCharIndex;
  const lettersRef = useRef([]);
  // we'll use another arr to add the values "correct" & "incorrect"
  const scoreBoard = useRef(Array(lettersRef.current.length).fill(""));

  const InputElem = useRef();
  useEffect(() => {
    let randomWordsList = faker.word.words(40).split("");
    dispatch(setWordsList(randomWordsList));
    InputElem.current.focus();
  }, []);

  useEffect(() => {
    if (localTimer === 0) {
      // send the score to the store when the time ends
      dispatch(setBoard(scoreBoard.current));
    }
  }, [localTimer]);

  const handleChange = (e) => {
    let value = e.target.value.slice(-1); // to get the last letter of the input value
    if (value === " ") {
      InputElem.current.value = "";
    }
    const letterExpected = lettersRef.current[letterIndex].textContent;
    if (letterExpected === value) {
      scoreBoard.current[letterIndex] = "correct";
      dispatch(setCurrentCharIndex("increment"));
    } else {
      scoreBoard.current[letterIndex] = "incorrect";
      dispatch(setCurrentCharIndex("increment"));
    }
  };

  return (
    <>
      <Timer localTimer={localTimer} />
      <div className="game w-75 d-flex flex-column  gap-5 mx-auto">
        <div className="words">
          {wordsList.map((char, index) => {
            return (
              <span
                key={index}
                className={`char ${
                  /*if the char is " " we'll add a padding so the words will be spaced between*/
                  char === " " ? "px-1" : ""
                } ${
                  /*if the index equals the index set in the state it means that this letter is the one to be typed */
                  letterIndex === index ? "current" : ""
                } ${
                  /* if the score is not set for the letter , we don't add any class
                   if it's set to "correct" we add the class "correct"
                   if it's set to "incorrect" we add the class "incorrect" */
                  scoreBoard.current[index] === undefined
                    ? ""
                    : scoreBoard.current[index]
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
              onChange={(e) => {
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
