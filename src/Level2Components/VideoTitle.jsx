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
    <Box
      pt={["4em", "4em", "20em"]}
      pb={["4em", "4em", "20em"]}
      className="  w-screen aspect-video pl-[7%] md:pl-[5%]  absolute  bg-gradient-to-r from-black text-white -mt-[3em] md:mt-0"
    >
      <Box width={["45%", "25%"]}>
        <Heading fontSize={["md", "2xl", "4xl"]}>{title}</Heading>

        <Text
          marginTop={"0.5em"}
          marginBottom={"1.5em"}
          fontSize={"0.9em"}
          className="hidden md:inline-block"
        >
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

        <Box className="flex flex-col md:flex-row gap-5">
          <button className="button-80-pushable mt-4 md:mt-0 " role="button">
            <span className="button-80-shadow"></span>
            <span className="button-80-edge"></span>
            <span className="button-80-front text  ">
              {" "}
              <Text className="mx-auto flex flex-row">
                <img
                  src="/icons8-play-96.png"
                  alt=""
                  className="w-4 h-4 mr-1 mt-1  mx-auto"
                />
                Play
              </Text>
            </span>
          </button>

          <button
            className="button-82-pushable p-20"
            role="button"
            onClick={handleGPTpage}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Gemini-Search</span>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoTitle;
