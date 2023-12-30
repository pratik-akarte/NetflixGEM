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
      <Center className="gradBack w-full h-full flex-col">
        <img
          src="https://i.gifer.com/SMLZ.gif"
          alt=""
          className="mt-12 w-[20%] mb-16"
        />
        <Box className="">
          <Heading>ERROR : THE PAGE DOESN'T EXIST</Heading>

          <Heading>{error.message}</Heading>

          <Center className="mt-12">
            <Button
              colorScheme="red"
              leftIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
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
