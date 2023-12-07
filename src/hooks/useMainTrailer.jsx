import { useEffect } from "react";

import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/movies";

const useMainTrailer = (movieId ) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId  +  "/videos?language=en-US" ,
      API_OPTIONS
    );

    const json = await data.json();

    const filterData = json?.results.filter(
      (video) => video?.name === "Official Trailer"
    ); 

    console.log(filterData);

    const trailer = filterData ? filterData[0] : json?.results[0];

    console.log(trailer);
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useMainTrailer;
