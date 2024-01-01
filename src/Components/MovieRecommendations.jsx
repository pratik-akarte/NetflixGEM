import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import MovieSuggestionCard from "../Level2Components/MovieSuggestionCard";

function MovieRecommendations() {
  const { movieSuggestions, movieNames } = useSelector((store) => store.GPT);
  if (!movieNames) return null;

  return (
    <>
      <Box
        className="mx-0 md:mx-10 -mt-[8em] md:-mt-[40em] pt-8 px-6 md:px-12 
       "
      >
        <MovieSuggestionCard
          key={movieNames}
          title={movieNames}
          movieData={movieSuggestions}
        />
      </Box>
    </>
  );
}

export default MovieRecommendations;
