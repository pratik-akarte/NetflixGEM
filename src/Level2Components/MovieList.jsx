import { Box, Heading, Flex } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieCard = lazy(() => import("./MovieCard"));

const MovieList = ({ title, movieData }) => {
  return (
    <Suspense fallback={<MovieCardSkeleton count={10} />}>
      <Box
        className="text-white"
        pl={[4, 6, 9]}
        mt={{ base: -40, md: -28, lg: 5 }}
      >
        <Heading
          py={[4, 8]}
          fontSize={["md", "lg", "xl"]}
          fontWeight="bold"
        >
          {title}
        </Heading>

        <Box
          overflowX="auto"
          pb={"5em"}
          css={{
            "&::-webkit-scrollbar": {
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "3px",
            },
          }}
        >
          <Flex
            gap={[2, 3, 4]}
            pb={[4, 5]}
            minW="max-content"
          >
            {movieData?.map((movie) => (
              <MovieCard
                key={movie?.id}
                imgPath={movie?.imgPath || movie?.backdrop_path}
                title={movie?.title}
                id={movie?.id}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </Suspense>
  );
};

export default MovieList;
