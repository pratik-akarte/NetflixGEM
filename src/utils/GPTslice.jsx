import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: " GPT",
  initialState: {
    toggleGPT: false,
    movieSuggestions: null,
    movieNames: null,
    resetStore: false,
  },
  reducers: {
    toggleGPTpage: (state) => {
      state.toggleGPT = !state.toggleGPT;
    },
    addMovieSuggestions: (state, action) => {
      const { moviesNames, moviesResult } = action.payload;

      state.movieSuggestions = moviesResult;
      state.movieNames = moviesNames;
    },
    resetStore: (state) => {
      state.movieSuggestions = null;
      state.movieNames = null;
    },
  },
});

export const { toggleGPTpage, addMovieSuggestions, resetStore } =
  gptSlice.actions;

export default gptSlice.reducer;
