import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

const GPTsearch = () => {
  return (
    <Box className="grad text-white pb-[45%] bg-gradient-to-b from-black ">
      <img src="/3658919.jpg" alt="bg" className="absolute -z-20 " />

      <Center mx="auto" my="auto" className="w-[70%] flex-col text-center  ">
        <a href="/browse" className="flex mr-[55%] mt-12">
          <button className="flex justify-start rounded-[50%] border p-3">
            <ChevronLeftIcon />
          </button>
          <Text marginTop={"6px"} marginLeft={"10px"}>
            {" "}
            Back to Home
          </Text>
        </a>
        <Box mx="auto">
          <Box>
            <Flex justifyContent="center" className="mt-2">
              <img
                width="140"
                height="140"
                src="/netflix-1-logo-svgrepo-com.svg"
                alt="netflix-desktop-app"
              />{" "}
              <img
                width="150"
                height="150"
                src="/icons8-chatgpt.svg"
                alt="chatgpt"
              />
            </Flex>

            <Heading>Netflix + OpenAI</Heading>
          </Box>
        </Box>
        <Box mx="auto">
          <Heading
            fontSize={"x-large"}
            marginTop={"1.5em"}
            marginBottom={"0.5em"}
          >
            Movie recommendations made easy with the power of emerging AI.
          </Heading>
          <Input type="text" placeholder="What's on your mind ?" />

          <Button marginTop={"1.5em"} padding={"1.7em"}>
            Get Movie Recommendations
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default GPTsearch;
