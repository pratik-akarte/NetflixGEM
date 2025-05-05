import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Box, Skeleton, Stack, Flex } from "@chakra-ui/react";

// Lazy load MovieList component
const MovieList = lazy(() => import("../Level2Components/MovieList"));

const SecondComponent = () => {
  const movies = useSelector((store) => store.movies);

  // Responsive Skeleton Loader
  const renderSkeleton = () => (
    <Stack spacing={3} px={[4, 6, 8]}>
      <Skeleton height="28px" width="50%" borderRadius="md" />
      <Flex
        gap={3}
        overflowX="auto"
        flexWrap={{ base: "nowrap", md: "wrap" }}
        pb={2}
      >
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            flexShrink={0}
            width={["40vw", "30vw", "160px"]}
            minW="120px"
          >
            <Skeleton
              height={["150px", "180px"]}
              borderRadius="lg"
              startColor="gray.700"
              endColor="gray.600"
            />
            <Skeleton mt={2} height="16px" width="80%" borderRadius="md" />
          </Box>
        ))}
      </Flex>
    </Stack>
  );

  return (
    <Box
      as="section"
      position="relative"

      // Padding at bottom for scroll breathing room
    >
      {/* Now Playing Section */}
      <Box
        mt={{ base: "10em", md: "1em", lg: "-21em" }} // Push below video background
        px={[2, 6, 8]}
        mb={[0, 8, 0]}
        pb={{ base: "12em", md: "2em", lg: "2em" }}
        sx={{
          "@media screen and (min-width: 786px) and (max-width: 1350px)": {
            
            marginTop:"1em"
          },
        }}
      >
        <Suspense fallback={renderSkeleton()}>
          <MovieList title="Now Playing" movieData={movies?.nowPlayingMovies} />
        </Suspense>
      </Box>

      {/* Remaining Sections */}
      {[
        { title: "Upcoming Movies", data: movies?.upcomingMovies },
        { title: "Trending Now", data: movies?.trendingMovies },
        { title: "Popular", data: movies?.popularMovies },
      ].map(({ title, data }) => (
        <Box
          key={title}
          px={[2, 6, 8]}
          pb={{ base: "12em", md: "2em", lg: "0em" }}
        >
          <Suspense fallback={renderSkeleton()}>
            <MovieList title={title} movieData={data} />
          </Suspense>
        </Box>
      ))}
    </Box>
  );
};

export default SecondComponent;
