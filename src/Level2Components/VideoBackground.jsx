/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import useMainTrailer from "../hooks/useMainTrailer";

const VideoBackground = ({ movieId }) => {
  const videoTrailer = useSelector((store) => store.movies?.movieTrailer);

  useMainTrailer(movieId);

  return (
    <div className="w-screen">
      <div className="absolute inset-12 bg-gradient-to-b from-black mb-0  h-[15%] w-full blur-sm mt-[1em]"></div>
      <iframe
        className="w-screen aspect-video -mt-12 "
        src={`https://www.youtube.com/embed/${videoTrailer?.key}?&mute=1&autoplay=1&fs=0&loop=1&controls=0&showinfo=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
