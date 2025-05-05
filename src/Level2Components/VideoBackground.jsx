import { useSelector } from "react-redux";
import useYouTubeSearch from "../hooks/useYouTubeSearch";

// eslint-disable-next-line react/prop-types
const VideoBackground = ({ movieTitle }) => {
  const videoTrailer = useSelector((store) => store.movies?.movieTrailer);
  useYouTubeSearch(movieTitle);

  return (
    <div className="w-full overflow-hidden"> {/* Changed this line */}
      <div className="absolute inset-x-0 top-0 h-[2%] md:h-[10%] bg-gradient-to-b from-black backdrop-blur-[0.5px] z-0"></div>

      {videoTrailer && (
        <iframe
          className="w-full aspect-video -mt-7 md:-mt-12"
          src={`https://www.youtube.com/embed/${videoTrailer}?&mute=1&autoplay=1&fs=0&loop=1&controls=0&showinfo=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;



