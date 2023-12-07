import { useSelector } from "react-redux";
import Movielist from "../Level2Components/MovieList";
import { Box } from "@chakra-ui/react";

const SecondComponent = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      <Box className="-mt-56 relative">
      <Movielist title={"Now Playing"} movieData={movies?.nowPlayingMovies} />
      </Box>
     
      
      <Movielist title={"Upcoming Movies"} movieData={movies?.upcomingMovies} />
      <Movielist title={"Trending Now"} movieData={movies?.trendingMovies} />
      <Movielist title={"Popular"} movieData={movies?.popularMovies} />
     
    </div>
  );
};

export default SecondComponent;
