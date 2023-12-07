/* eslint-disable react/prop-types */
// ----MOVIELIST BY GENRE

import { Heading } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

// eslint-disable-next-line react/prop-types
const Movielist = ({ title, movieData }) => {
  console.log(title, movieData);
  return (
    <div className="pl-12 -mt-[12em]">
      <Heading paddingY={"1rem"} fontSize={"xl"}>
        {title}
      </Heading>
      <div
        className="flex"
        style={{ overflowX: "auto", scrollbarWidth: "thin" }}
      >
        <div className="flex flex-row gap-4 cursor-pointer">
          {movieData?.map((movie) => (
            <MovieCard key={movie?.id} imgPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movielist;
