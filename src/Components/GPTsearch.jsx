/* eslint-disable react/no-unescaped-entities */
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Input,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { Gemini_API_Key, OMDB_KEY } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch } from "react-redux";
import { addMovieSuggestions } from "../utils/GPTslice";

const GPTsearch = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const inputText = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(Gemini_API_Key);

  //Gemini API call
  const gemini = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt =
        "Act as a movies recommendation system and suggest some movies for the query" +
        inputText?.current?.value +
        ". Only Give me 8 movies name , comma separated and without numeration like the example given ahead. Example: Gadar,Animal,Pathan,Tiger,Jawan";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const moviesArray = text.split(",").map((movie) => movie.trim());
      console.warn(moviesArray);
      return moviesArray;
    } catch (error) {
      console.error("Error in gemini function:", error);
      // Handle the error as needed, e.g., display an error message to the user
      throw error; // Rethrow the error if needed
    }
  };

  const getMovies = async (movie) => {
    try {

      console.log(movie)
      const apiKey = OMDB_KEY

      const data = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(movie)}&apikey=${apiKey}`
      );

      const json = await data?.json();

      // console.log(json)

      // Return only the first movie from the search results
      return json?.Search?.[0];
    } catch (error) {
      console.error("Error in getMovies function:", error);
      // Handle the error as needed, e.g., display an error message to the user
      throw error; // Rethrow the error if needed
    }
  };

  //TMDB movie search
  const handleSubmit = async () => {
    // dispatch(gptSearhResults({ movienames: null, movieResult: null, loading: true }));

    try {
      setIsLoading(true);
      if (inputText?.current?.value === "") {
        alert("Let us know what do you want to watch today ?");

        return;
      }
      // dispatch(gptSearhResults({ movienames: null, movieResult: null, loading: true }));

      const moviesArray = await gemini();
      const movies = moviesArray;

      const PromiseArray = movies.map((movie) => getMovies(movie));

      const tmdbMovies = await Promise.all(PromiseArray);
      

      const firstMovies = tmdbMovies.map((result) => result);

      // console.log(moviesArray);
      // console.log(firstMovies, "fffffff");

      dispatch(
        addMovieSuggestions({
          moviesNames: moviesArray,
          moviesResult: firstMovies,
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="grad text-white pb-[45%] bg-gradient-to-b from-black ">
      <img
        src="/3658919.jpg"
        alt="bg"
        className={`absolute -z-20 object-cover  ${isMobile ? "h-screen" : ""}`}
      />

      <Center mx="auto" my="auto" className="w-[70%] flex-col text-center  ">
        <a href="/browse" className="flex mr-[55%] mt-6">
          <button className="flex justify-start p-2 md:p-3 ">
            <ChevronLeftIcon />
          </button>
          <Text
            marginTop={"6px"}
            marginLeft={["1px", "0px"]}
            fontSize={["xs", "md"]}
            fontWeight={"semibold"}
          >
            {" "}
            Back to Home
          </Text>
        </a>
        <Box mx="auto">
          <Flex className="justify-betweenn flex-col pb-8">
            <img
              src="/Netflix-Logo.wine.svg"
              alt="netflix-desktop-app"
              className="mr-[3em] w-[160px] md:w-[270px]"
            />{" "}
            <img
              width="250"
              src="/final_keyword_header.width-1200.format-webp__1_-removebg-preview.png"
              alt="chatgpt"
              className=" absolute  mt-[3.3em] md:mt-[5.5em] ml-[3.9em] md:ml-[6.8em] w-[160px] md:w-[250px]"
              
            />
          </Flex>
        </Box>
        <Text
          fontSize={["sm", "lg", "xl"]}
          marginBottom={"0.5em"}
          className="font-semibold"
        >
          Dive into the Infinite Universe of Movies with Google's Gemini
          <br />
          Your Personal Cinematic Odyssey Begins Now🚀
        </Text>

        <Box mx="auto">
          <Input
            type="text"
            placeholder="What's on your mind ?"
            ref={inputText}
            padding={"1.6em"}
            variant="flushed"
            fontSize={["xs", "sm"]}
            focusBorderColor="red.500"
          />

          <button
            className="button-82-pushable mt-[1.5em] p-[1.7em]"
            role="button"
            onClick={handleSubmit}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text ">
              <Text px={["1.5em", "1em"]}>Get Movie Recommendations</Text>
            </span>
          </button>
        </Box>

        {isLoading && (
          <Box className="backdrop-blur-sm w-1/2 md:w-[25%] mt-12 py-4 rounded-full">
            <Spinner size="xl" color="red.500" />
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default GPTsearch;
