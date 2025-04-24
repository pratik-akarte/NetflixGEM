
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, OMDB_KEY } from "../utils/constants";
import { addPopularMovies } from "../utils/movies";


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

const usePopular = () => {
  const dispatch = useDispatch();

  const getPopular = async () => {
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

      console.log(traktData)

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

      console.log(moviesData);
      // Filter out any null entries and dispatch
      dispatch(addPopularMovies(moviesData.filter(Boolean)));
      
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      // You might want to dispatch an error action here
    }
  };

  useEffect(() => {
    getPopular();
  }, []);
};

export default usePopular;




