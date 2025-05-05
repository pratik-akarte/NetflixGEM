import { Box, Skeleton } from "@chakra-ui/react";

const MovieCardSkeleton = ({ count = 10 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Box 
          key={index}
          flexShrink={0}
          w={["100px", "120px", "140px", "160px"]} // Responsive width
          mr={[2, 3, 4]} // Matches the gap from MovieList
        >
          {/* Poster Skeleton */}
          <Skeleton
            aspectRatio="2/3" // Standard movie poster aspect ratio
            borderRadius="md"
            speed={1.2} // Slightly faster animation
            opacity={0.7}
          />
          
          {/* Title Skeleton */}
          <Skeleton
            mt={2}
            height="16px"
            width="80%"
            borderRadius="sm"
          />
          
          {/* Optional Rating Skeleton */}
          <Skeleton
            mt={1}
            height="12px"
            width="60%"
            borderRadius="sm"
          />
        </Box>
      ))}
    </>
  );
};

export default MovieCardSkeleton;