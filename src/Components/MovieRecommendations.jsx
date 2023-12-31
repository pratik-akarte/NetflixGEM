import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import MovieSuggestionCard from "../Level2Components/MovieSuggestionCard";

function MovieRecommendations() {
  const { movieSuggestions, movieNames } = useSelector((store) => store.GPT);
  if (!movieNames) return null;

  return (
    <Box className="mx-5 md:mx-10 mt-12 md:-mt-[40em] backdrop-blur-sm">
      <MovieSuggestionCard
        key={movieNames}
        title={movieNames}
        movieData={movieSuggestions}
      />
    </Box>
  );
}

export default MovieRecommendations;
