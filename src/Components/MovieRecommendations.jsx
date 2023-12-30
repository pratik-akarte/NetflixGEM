import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import MovieSuggestionCard from "../Level2Components/MovieSuggestionCard";

function MovieRecommendations() {
  const { movieSuggestions, movieNames } = useSelector((store) => store.GPT);
  if (!movieNames) return null;

  return (
    <Box className=" mx-12 -mt-[40em]  backdrop-blur-sm ">
      <Box className=""> 
        <MovieSuggestionCard
          key={movieNames}
          title={movieNames}
          movieData={movieSuggestions}
        />
      </Box>
    </Box>
  );
}

export default MovieRecommendations;
