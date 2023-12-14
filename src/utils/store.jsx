import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData.jsx";
import moviesReducer from "./movies.jsx";
import GPTReducer from "./GPTslice.jsx";

const userStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    GPT: GPTReducer,
  },
});

export default userStore;
