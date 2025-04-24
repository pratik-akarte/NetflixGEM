/* eslint-disable react/prop-types */
import { Text } from "@chakra-ui/react";


const MovieCard = ({ imgPath, title }) => {
  if (imgPath == "N/A") return null;
  return (
    <>
      <div className="w-[7em] md:w-[10rem] h-[10em] md:h-[30rem]  hover:scale-95 transition ease-in-out">
        <img src={imgPath} alt="movie card " />
        <Text marginTop={"0.8em"} fontSize={["xs", "md", "md"]}>
          {title}
        </Text>
      </div>
    </>
  );
};

export default MovieCard;
