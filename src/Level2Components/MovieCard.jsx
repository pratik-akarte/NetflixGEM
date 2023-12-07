/* eslint-disable react/prop-types */
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ imgPath }) => {
  return (
    <>
      <div className="w-[12rem] h-[30rem] ">
        <img src={IMG_CDN_URL + imgPath} alt="movie cardddddddd" />
      </div>
    </>
  );
};

export default MovieCard;
