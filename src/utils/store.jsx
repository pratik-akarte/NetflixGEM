import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData.jsx";
import moviesReducer from "./movies.jsx";

const userStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default userStore;
