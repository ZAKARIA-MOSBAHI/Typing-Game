import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    state: "gameStart",
    timer: 0,
    difficulty: "normal",
    language: "en",
  },
  reducers: {
    setGameState: (state, action) => {
      state.state = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {
  setTimer,
  startTimer,
  setDifficulty,
  setLanguage,
  setGameState,
} = gameSlice.actions;
