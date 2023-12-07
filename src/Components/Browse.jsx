import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying";
import MainContaier from "./MainContaier";
import SecondComponent from "./SecondComponent";
import useUpcomingMovie from "../hooks/useUpcomingMovie";
import useTrending from "../hooks/useTrending";
import usePopular from "../hooks/usePopular";

function Browse() {
  useNowPlaying();
  useUpcomingMovie();
  useTrending();
  usePopular();
  return (
    <div>
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
    </div>
  );
}

export default Browse;
