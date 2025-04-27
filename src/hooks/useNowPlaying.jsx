import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, OMDB_KEY } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movies";

// Cache for OMDB data to avoid duplicate requests
const omdbCache = new Map();

// Creates a Map to cache OMDB API responses
// fetchWithCache function checks cache first before making network requests
// If not cached, makes the request and stores result before returning

const fetchWithCache = async (url) => {
  if (omdbCache.has(url)) {
    return omdbCache.get(url);
  }
  const response = await fetch(url);
  const data = await response.json();
  omdbCache.set(url, data);
  return data;
};

const useNowPlaying = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      // Fetch trending movies from Trakt
      const traktResponse = await fetch(
        "https://api.trakt.tv/movies/trending", 
        API_OPTIONS
      );
      
      if (!traktResponse.ok) {
        throw new Error(`Trakt API error: ${traktResponse.status}`);
      }

      const traktData = await traktResponse.json();

      // Process movies in parallel
      //fetches all OMDB api data at once  in parallel operation rather than one at a time
//       .map() creates an array of Promises (one for each movie).
// Promise.all waits for all Promises to resolve (but they run in parallel).
      const moviesData = await Promise.all(
        traktData.slice(0, 10).map(async (movieEntry) => {
          if (!movieEntry?.movie?.ids?.imdb) return null;
          
          const imdbId = movieEntry.movie.ids.imdb;
          const omdbUrl = `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_KEY}`;
          
          try {
            const posters = await fetchWithCache(omdbUrl);
            
            return {
              title: movieEntry.movie?.title,
              id: imdbId,
              imgPath: posters?.Poster,
              data: posters?.Plot,
            };
          } catch (error) {
            console.error(`Failed to fetch OMDB data for ${imdbId}:`, error);
            return {
              title: movieEntry.movie?.title,
              id: imdbId,
              imgPath: null,
              data: null,
            };
          }
        })
      );

      // console.log(moviesData);
      // Filter out any null entries and dispatch
      dispatch(addNowPlayingMovies(moviesData.filter(Boolean)));
      
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      // You might want to dispatch an error action here
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlaying;








// import { useEffect } from "react";
// import { API_OPTIONS, OMDB_KEY } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addNowPlayingMovies } from "../utils/movies";

// const useNowPlaying = () => {
//   const dispatch = useDispatch();

  

//   const getNowPlayingMovies = async () => {
//     const data = await fetch(
//       "https://api.trakt.tv/movies/trending",
//       API_OPTIONS
//     );

  
//     const response = await data.json();

//     // console.log(response);

//     const moviesData = [];

//     // Extract movies from numbered keys (1, 2, 3, ...)
//     for (let i = 1; i <= 10; i++) {
//       // Adjust loop limit as needed
//       const movieEntry = response[i];
//       if (movieEntry && movieEntry.movie) {
//         const details = await fetch(
//           "https://www.omdbapi.com/?i=" +
//             movieEntry.movie?.ids?.imdb +
//             "&apikey=" +
//             OMDB_KEY
//         );
//         let posters = await details.json();

//         moviesData.push({
//           title: movieEntry?.movie?.title,
//           id: movieEntry.movie?.ids?.imdb,
//           imgPath: posters?.Poster,
//           data: posters?.Plot,
//         });
//       }
//     }

//     dispatch(addNowPlayingMovies(moviesData));
//     console.log(moviesData);
//   };

//   useEffect(() => {
//     getNowPlayingMovies();
//   }, []);
// };

// export default useNowPlaying;
