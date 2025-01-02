import { createSlice } from "@reduxjs/toolkit";

export const wordsSlice = createSlice({
  name: "words",
  initialState: {
    wordsList: [],
    currentCharIndex: 0, // means by default the first letter is selected
  },
  reducers: {
    setWordsList: (state, action) => {
      state.wordsList = action.payload;
    },
    setCurrentCharIndex: (state, action) => {
      switch (action.payload) {
        case "increment":
          // you can't use (return state.currentCharIndex + 1) here , it'll cause an infinite loop
          return { ...state, currentCharIndex: state.currentCharIndex + 1 };
        case "decrement":
          return { ...state, currentCharIndex: state.currentCharIndex - 1 };
        case "reset":
          return { ...state, currentCharIndex: 0 };
        default:
          return state;
      }
    },
  },
});

export const { setWordsList, setCurrentCharIndex } = wordsSlice.actions;
