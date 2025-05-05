import { Center, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Center className="w-screen h-screen" color="red.400" bg="black">
      <Spinner size="xl" />
    </Center>
  );
}

export default Loading;
