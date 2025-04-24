import { useSelector } from "react-redux";
import useYouTubeSearch from "../hooks/useYouTubeSearch";

// eslint-disable-next-line react/prop-types
const VideoBackground = ({ movieTitle }) => {
  const videoTrailer = useSelector((store) => store.movies?.movieTrailer);

  useYouTubeSearch(movieTitle);

  return (
    <div className="w-full sm:w-screen z-10">
      <div className="absolute inset-2 md:inset-10 bg-gradient-to-b from-black mb-0 h-[2%] md:h-[10%] sm:w-[93em] md:w-full blur-sm backdrop-blur-[0.5px] drop-shadow-[60px]"></div>

      {videoTrailer && (
        <iframe
          className="w-full sm:w-screen aspect-video -mt-7 md:-mt-12"
          src={`https://www.youube.com/embed/${videoTrailer}?&mute=1&autoplay=1&fs=0&loop=1&controls=0&showinfo=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
