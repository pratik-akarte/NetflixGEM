/* eslint-disable react/no-unescaped-entities */
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";

import { Gemini_API_Key, API_OPTIONS } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useDispatch } from "react-redux";
import { addMovieSuggestions } from "../utils/GPTslice";

const GPTsearch = () => {
  const inputText = useRef(null);
  const dispatch = useDispatch();

  const genAI = new GoogleGenerativeAI(Gemini_API_Key);

  //Gemini API call
  const gemini = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt =
        "Act as a movies recommendation system and suggest some movies for the query" +
        inputText?.current?.value +
        ". Only Give me 7 movies name , comma separated and without numeration like the example given ahead. Example: Gadar,Animal,Pathan,Tiger,Jawan";

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

  const getMovies = async (movie ) => {
    console.warn(movie);
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie ,
      API_OPTIONS
    );

    const json = await data.json();

    return json?.results;
  };

  //TMDB movie search
  const handleSubmit = async () => {
    // dispatch(gptSearhResults({ movienames: null, movieResult: null, loading: true }));

    if (inputText?.current?.value === "") {
      alert("Let us know what do you want to watch today ?");
      return;
    }
    // dispatch(gptSearhResults({ movienames: null, movieResult: null, loading: true }));

    const moviesArray = await gemini();
    const movies = moviesArray;

    const PromiseArray = movies.map((movie) => getMovies( movie ));

    const tmdbMovies = await Promise.all(PromiseArray);

    console.log(moviesArray);
    console.log(tmdbMovies);

    dispatch(
      addMovieSuggestions({
        moviesNames: moviesArray,
        moviesResult: tmdbMovies,
      })
    );
  };

  return (
    <Box className="grad text-white pb-[45%] bg-gradient-to-b from-black ">
      <img src="/3658919.jpg" alt="bg" className="fixed -z-20 " />

      <Center mx="auto" my="auto" className="w-[70%] flex-col text-center  ">
        <a href="/browse" className="flex mr-[55%] mt-6">
          <button className="flex justify-start rounded-[50%] border p-3">
            <ChevronLeftIcon />
          </button>
          <Text marginTop={"6px"} marginLeft={"10px"}>
            {" "}
            Back to Home
          </Text>
        </a>
        <Box mx="auto">
          <Flex className="justify-betweenn flex-col pb-8">
            <img
              width="270"
              src="/Netflix-Logo.wine.svg"
              alt="netflix-desktop-app"
              className="mr-[3em]"
            />{" "}
            <img
              width="250"
              src="/final_keyword_header.width-1200.format-webp__1_-removebg-preview.png"
              alt="chatgpt"
              className=" absolute mt-[5.5em] ml-[6.8em]"
            />
          </Flex>
        </Box>
        <Text fontSize={"xl"} marginBottom={"0.5em"} className="font-semibold">
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
            focusBorderColor="red.500"
          />

          <Button marginTop={"1.5em"} padding={"1.7em"} onClick={handleSubmit}>
            Get Movie Recommendations
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default GPTsearch;
