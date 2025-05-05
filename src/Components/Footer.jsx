import { Box, Flex, Text, Image, Center } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa"; // Using Font Awesome heart icon

const Footer = () => {
  return (
    <Box as="footer" py={6} bg="black" mt="auto">
      <Center>
        <Flex direction="column" align="center" maxW="1200px" px={4}>
          {/* App Icon */}
          <Image
            src="/logo.png" // Replace with your icon path
            alt="App Logo"
            loading="lazy"
            boxSize="40px"
            mb={3}
          />

          <Text as="span" fontSize="md" color="gray.600">
            Made with{" "}
            <FaHeart
              style={{
                display: "inline-block",
              }}
            />{" "}
            in India.
          </Text>

          <Text fontSize="md" color="gray.600" textAlign="center">
            © {new Date().getFullYear()} NetflixGEM. All rights reserved.
          </Text>
        </Flex>
      </Center>
    </Box>
  );
};

export default Footer;
