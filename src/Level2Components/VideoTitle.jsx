import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleGPTpage } from "../utils/GPTslice";
import { useDialog, DialogComponent } from "./BlurredModal";

const VideoTitle = ({ title, overview, srcImg, movieId ,TrailerId}) => {
  const { isOpen, onClose, openDialog } = useDialog();
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGPTpage = () => {
    navigate("/Geminisearch");
    dispatch(toggleGPTpage());
  };

  const handlePlayClick = () => {
    // Pass both the movie data and placement to the dialog
    openDialog(
      {
        title,
        overview,
        srcImg,
        id: movieId,       
        TrailerId:TrailerId
      },
      "center"
    );
  };
 
  return (
    <Box
      pt={["4em", "4em", "20em"]}
      pb={["4em", "4em", "20em"]}
      className="w-screen aspect-video pl-[7%] md:pl-[5%] absolute bg-gradient-to-r from-black text-white -mt-[3em] md:mt-0"
    >
      <Box
        width={["45%", "25%"]}
        ml={{ base: "12px", md: "20px", lg: "-6.6px" }}
      >
        <Heading fontSize={["md", "2xl", "4xl"]} pb={{base:"0.5em" , md: "0", lg: "0"}}>{title}</Heading>

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
            {readMore ? "show less" : "read more"}
          </button>
        </Text>

        <Box className="flex flex-col md:flex-row gap-5">
          <button
            className="button-82-pushable p-20"
            role="button"
            onClick={handlePlayClick}
          >
            <span className="button-80-front text">
              <Text className="mx-auto flex flex-row">
                <img
                  src="/icons8-play-96.png"
                  alt="Play"
                  className="w-4 h-4 mr-1 mt-1 mx-auto"
                />
                Play
              </Text>
            </span>
          </button>

          <DialogComponent
            isOpen={isOpen}
            onClose={onClose}
            movie={{  title, overview, srcImg, movieId ,TrailerId }}  // Pass all needed movie data
          />

          <button
            className="button-82-pushable p-20"
            role="button"
            onClick={handleGPTpage}
          >
            <span className="button-82-front text">Gemini-Search</span>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoTitle;