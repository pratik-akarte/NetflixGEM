/* eslint-disable react/prop-types */
// ----MOVIELIST BY GENRE

import { Box, Heading } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

// eslint-disable-next-line react/prop-types
const Movielist = ({ title, movieData }) => {
  // console.log(title, movieData);
  return (
    <Box className="pl-12 -mt-[12em] text-white  " paddingY={["0rem", "1rem"]}>
      <Heading paddingY={["1rem", "2rem"]} fontSize={["md", "lg", "xl"]}>
        {title}
      </Heading>
      <div
        className="flex"
        style={{ overflowX: "auto", scrollbarWidth: "thin" }}
      >
        <div className="flex flex-row gap-2 md:gap-4 cursor-pointer  pb-[80%]  md:mb-0">
          {movieData?.map((movie) => (
            <MovieCard
              key={movie?.id}
              imgPath={movie?.poster_path}
              title={movie?.title}
              id={movie?.id}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Movielist;
