import { Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";

// Lazy load components
const GPTsearch = lazy(() => import("./GPTsearch"));
const MovieRecommendations = lazy(() => import("./MovieRecommendations"));

function GeminiSearch() {
  return (
    <>
      <Suspense fallback={<div className="text-white">Loading Search...</div>}>
        <GPTsearch />
      </Suspense>

      <Box className="backdrop-blur-md rounded-md">
        <Suspense fallback={<div className="text-white">Loading Recommendations...</div>}>
          <MovieRecommendations />
        </Suspense>
      </Box>
    </>
  );
}

export default GeminiSearch;
