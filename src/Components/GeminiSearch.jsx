import { Box } from "@chakra-ui/react";
import GPTsearch from "./GPTsearch";
import MovieRecommendations from "./MovieRecommendations";

function GeminiSearch() {
  return (
    <div className="">
      <GPTsearch />
      <Box className="  backdrop-blur-md rounded-md   ">
        <MovieRecommendations />
      </Box>
    </div>
  );
}

export default GeminiSearch;
