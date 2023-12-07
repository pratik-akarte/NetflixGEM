import { createSlice } from "@reduxjs/toolkit";

const moviesData = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieTrailer: null,
    upcomingMovies: null,
    trendingMovies: null,
    popularMovies : null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },

    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },

    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },

    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },

    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addMovieTrailer,
  addUpcomingMovies,
  addTrendingMovies,
  addPopularMovies
} = moviesData.actions;

export default moviesData.reducer;
