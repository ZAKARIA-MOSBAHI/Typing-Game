import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "../Slices/gameSlice";
import { playerSlice } from "../Slices/playerSlice";
import { wordsSlice } from "../Slices/wordsSlice";
import { scoreSlice } from "../Slices/scoreSlice";

const rootReducer = combineReducers({
  game: gameSlice.reducer,
  player: playerSlice.reducer,
  words: wordsSlice.reducer,
  score: scoreSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
