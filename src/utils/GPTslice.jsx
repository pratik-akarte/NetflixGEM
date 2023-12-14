import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: " GPT",
  initialState: {
    toggleGPT: false,
  },
  reducers: {
    toggleGPTpage: (state) => {
      state.toggleGPT = !state.toggleGPT;
    },
  },
});

export const { toggleGPTpage } = gptSlice.actions;

export default gptSlice.reducer;
