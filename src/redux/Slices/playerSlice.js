import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    //isTyping to see if he's not afk
    isTyping: true,
  },
  reducers: {
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
  },
});
