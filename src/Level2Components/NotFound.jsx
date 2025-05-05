/* eslint-disable react/no-unescaped-entities */
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  console.error(error);
  // Uncaught RefereceError: path is not defined

  const navigate = useNavigate();

  return (
    <>
      <Center className="gradBack w-screen h-screen flex-col bg-[#1e1920]  text-white ">
        <img
          src="https://i.gifer.com/SMLZ.gif"
          loading="lazy" 
          alt=""
          className=" -mt-[15em] md:mt-1 w-[55%] md:w-[20%] mb-16 rounded-lg"
        />
        <Box className="">
          <Heading fontSize={["md", "xl"]}>
            ERROR : THE PAGE DOESN'T EXIST
          </Heading>

          <Heading>{error.message}</Heading>

          <Center className="mt-12">
            <Button
              colorScheme="red"
              leftIcon={<ArrowBackIcon />}
              onClick={() => location.reload()}
            >
              Back to Home
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
}

export default NotFound;
