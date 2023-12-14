/* eslint-disable react/prop-types */
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ imgPath }) => {
  return (
    <>
      <div className="w-[10rem] h-[30rem]  hover:scale-95 transition ease-in-out">
        <img src={IMG_CDN_URL + imgPath} alt="movie card" />
      </div>
    </>
  );
};

export default MovieCard;
