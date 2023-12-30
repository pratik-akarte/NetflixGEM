/* eslint-disable react/prop-types */
// import { InfoIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleGPTpage } from "../utils/GPTslice";

const VideoTitle = ({ title, overview }) => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGPTpage = () => {
    navigate("/Geminisearch");
    dispatch(toggleGPTpage());
  };

  return (
    <div className="pt-[20em] w-screen aspect-video pl-[10em] absolute bg-gradient-to-r from-black text-white">
      <Box width={"25%"}>
        <Heading>{title}</Heading>

        <Text marginTop={"0.5em"} marginBottom={"1.5em"} fontSize={"0.9em"}>
          {readMore ? overview : `${overview.substring(0, 80)}...`}{" "}
          <button
            className="btn font-bold"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "show less" : "  read more"}
          </button>
        </Text>

        {/* <Button
          width={"10em"}
          padding={"1.5em"}
          className=""
          variant="outline"
          onClick={() => setReadMore(!readMore)}
          color={"white"}
        >
          <InfoIcon className="mr-2 " />{" "}
          {readMore ? " Less Info" : " More Info"}
        </Button> */}

        <Box className="flex flex-row gap-5">
          <button className="button-80-pushable" role="button">
            <span className="button-80-shadow"></span>
            <span className="button-80-edge"></span>
            <span className="button-80-front text ">
              {" "}
              <img
                src="/icons8-play-96.png"
                alt=""
                className="w-4 h-4 mr-1 mt-1 "
              />
              Play
            </span>
          </button>

          <button
            className="button-82-pushable"
            role="button"
            onClick={handleGPTpage}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Gemini-Search</span>
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default VideoTitle;
