/* eslint-disable react/prop-types */
import { Box, Image, Text } from "@chakra-ui/react";

const MovieCard = ({ imgPath, title }) => {
  if (imgPath === "N/A") return null;

  return (
    <Box
      w={["6.5em", "8em", "10em"]}
      h={["10em", "14em", "auto"]}
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: "scale(0.95)" }}
    >
      <Image
        src={imgPath}
        alt={title}
        loading="lazy"
        w="12em"
        h="16em"
        objectFit="cover"
        borderRadius="md"
      />
      <Text mt="2" fontSize={["xs", "sm", "md"]} noOfLines={2}>
        {title}
      </Text>
    </Box>
  );
};

export default MovieCard;
