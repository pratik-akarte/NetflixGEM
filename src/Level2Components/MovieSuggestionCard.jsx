/* eslint-disable react/prop-types */
// ----MOVIELIST BY GENRE

import MovieCard from "./MovieCard";

// eslint-disable-next-line react/prop-types
const MovieSuggestionCard = ({ movieData }) => {
  
  if (!Array.isArray(movieData)) {
    console.error("Movie data is not an array:", movieData);
    // You can handle this error appropriately, e.g., return an error message or an empty div
    return <div>Error: Movie data is not available</div>;
  }
  return (
    <>
      <div className="cursor-pointer text-white font-bold gap-5 w-full h-full flex overflow-x-auto no-scrollbar">
        {movieData?.map((movie) => (
          <MovieCard
            key={movie?.imdbID}
            imgPath={movie?.Poster}
            title={movie?.Title}
            id={movie?.Year}
          />
        ))}
      </div>
    </>
  );
};

export default MovieSuggestionCard;
