import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movies";

const usePopular = () => {
  const dispatch = useDispatch();

  const getPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispatch(addPopularMovies(json?.results));
  };

  useEffect(() => {
    getPopular();
  }, []);
};

export default usePopular;
