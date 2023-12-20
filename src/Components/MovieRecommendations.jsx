import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Movielist from "../Level2Components/MovieList";

function MovieRecommendations() {
  const { movieSuggestions, movieNames } = useSelector((store) => store.GPT);
  if (!movieNames) return null;

  return (
    <Box className="bg-black text-yellow-100 mx-32 -mt-[40em]  ">
      <Box>
        {movieNames.map((movie, index) => (
          <Movielist
            key={movie}
            title={movie}
            movieData={movieSuggestions[index]}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MovieRecommendations;
