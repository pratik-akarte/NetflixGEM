import { Suspense, lazy } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";

import useNowPlaying from "../hooks/useNowPlaying";
import useUpcomingMovie from "../hooks/useUpcomingMovie";
import useTrending from "../hooks/useTrending";
import usePopular from "../hooks/usePopular";

// Lazy-loaded components
const Header = lazy(() => import("./Header"));
const MainContainer = lazy(() => import("./MainContaier"));
const SecondComponent = lazy(() => import("./SecondComponent"));
const Footer = lazy(() => import("./Footer"));

function Browse() {
  // Data fetching hooks
  useNowPlaying();
  useUpcomingMovie();
  useTrending();
  usePopular();

  return (
    <Box bg="black" minH="100vh" w="100vw">
      <Suspense
        fallback={
          <Center minH="60vh">
            <Spinner size="xl" color="red.400" thickness="4px" speed="0.65s" />
          </Center>
        }
      >
        <>
        <Header />
        <MainContainer />
        </>
        

        </Suspense>
        
        <Suspense
        fallback={
          <Center minH="60vh">
            <Spinner size="xl" color="gray.400" thickness="4px" speed="0.65s" />
          </Center>
        }
      >

        <SecondComponent />
        <Footer />
        </Suspense>
    </Box>
  );
}

export default Browse;
