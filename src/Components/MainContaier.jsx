import { useSelector } from "react-redux";
import { lazy } from "react";

// Lazy load components
const VideoTitle = lazy(() => import("../Level2Components/VideoTitle"));
const VideoBackground = lazy(() => import("../Level2Components/VideoBackground"));

const MainContaier = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  const MovieTrailerId = useSelector((store) => store.movies?.movieTrailer);
  

  if (!movies) return null;

  const mainMovie = movies[0];
  const { title, data, id ,imgPath } = mainMovie;

  return (
    <div className="w-full aspect-video pt-[25%] md:pt-0">
      
        <VideoTitle title={title} overview={data} srcImg={imgPath} TrailerId={MovieTrailerId} movieId={id}/>
    
        <VideoBackground movieTitle={title} key={id} />
    
    </div>
  );
};

export default MainContaier;
