import { createSlice } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
  name: "score",
  initialState: {
    board: [], //this list will contain either "correct" or "incorrect"
    wpm: 0,
    mistakes: 0,
    characters: 0,
  },
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setWPM: (state, action) => {
      state.wpm = action.payload;
    },
    setMistakes: (state, action) => {
      state.mistakes = action.payload;
    },
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
  },
});
export const { setBoard, setWPM, setMistakes, setCharacters } =
  scoreSlice.actions;
