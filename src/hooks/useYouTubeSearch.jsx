import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/movies"; // Replace with your actual action
import { Y_API_KEY } from "../utils/constants";

// 🧠 In-memory cache to avoid repeated API calls
const videoCache = {};

const useYouTubeSearch = (movieTitle) => {
  const dispatch = useDispatch();

  // 🔍 Function to fetch video ID from YouTube
  const fetchVideo = async () => {
    try {
      // ✅ If the video is already in cache, use it
      if (videoCache[movieTitle]) {
        dispatch(addMovieTrailer(videoCache[movieTitle]));
        return;
      }

      // 🌐 Make the API call to YouTube
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
          movieTitle + " trailer"
        )}&key=${Y_API_KEY}&type=video`
      );

      const data = await res.json();
      // console.log("YouTube API Response:", data);

      const videoId = data?.items?.[0]?.id?.videoId;

      // 🎯 If we got a videoId, cache and dispatch it
      if (videoId) {
        videoCache[movieTitle] = videoId; // 💾 Cache it
        dispatch(addMovieTrailer(videoId)); // 📦 Send to Redux store
      }
    } catch (err) {
      console.error("YouTube Search Error:", err);
    }
  };

  // ⚛️ React hook: Runs when movieTitle or dispatch changes
  useEffect(() => {
    if (movieTitle) fetchVideo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle, dispatch]);
};


export default useYouTubeSearch;



// import { useEffect } from "react";
// import { Trailer_API_Options } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addMovieTrailer } from "../utils/movies";

// const useMainTrailer = (movieId) => {
//   const dispatch = useDispatch();

//   const apiUrl = `https://api.kinocheck.com/movies?imdb_id=${movieId}`+ `&language=en&categories=Trailer`;

  

//   const getMovieTrailer = async () => {
    
//     const data = await fetch(apiUrl);

//     const json = await data.json(); 

//     const vid = json?.videos;

//     console.log(vid)

//     const filterData = vid.filter(
//       (video) =>
//         video?.title.includes("Trailer")
//     );

//     console.log(filterData);

//     const trailer = filterData[2]?.youtube_video_id;2
//     console.log(trailer);
//     dispatch(addMovieTrailer(trailer));
//   };

//   useEffect(() => {
//     getMovieTrailer();
//   }, []);
// };

// export default useMainTrailer;
