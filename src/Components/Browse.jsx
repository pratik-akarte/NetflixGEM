import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying";
import MainContaier from "./MainContaier";
import SecondComponent from "./SecondComponent";
import useUpcomingMovie from "../hooks/useUpcomingMovie";
import useTrending from "../hooks/useTrending";
import usePopular from "../hooks/usePopular";
import { Box } from "@chakra-ui/react";
import Footer from "./Footer";

function Browse() {
  useNowPlaying();
  useUpcomingMovie();
  useTrending();
  usePopular();
  return (
    <Box className="bg-black">
      <Header />

      <MainContaier />

      {/*
      MainContainer
         -VideoTitle
         -VideoBackground
      SecondaryContainer
         - MoviesList * n
           Cards * n   
       */}

      <SecondComponent />
      <Footer/>
    </Box>
  );
}

export default Browse;
