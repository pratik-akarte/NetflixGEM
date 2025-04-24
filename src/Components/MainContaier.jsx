
import VideoTitle from "../Level2Components/VideoTitle";
import VideoBackground from "../Level2Components/VideoBackground";
import { useSelector } from "react-redux";

const MainContaier = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];

  console.log(mainMovie);

  const { title, data , id } = mainMovie;

  return (
    <div className="w-screen aspect-video pt-[25%] md:pt-0 ">
      <VideoTitle title={title} overview={data} />
      <VideoBackground movieTitle={title}  key={id}/>

      {/* <div className="video-background">
    <div className="video-foreground">
      <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

<div id="vidtop-content">
<div className="vid-info">
	  <h1>YouTube Fullscreen Background Demo</h1>
  </div>
  </div> */}
    </div>
  );
};

export default MainContaier;
