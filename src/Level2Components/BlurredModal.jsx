import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
  useDisclosure,
  Text,
  Image,
  Button
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";

export const useDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("center");
  const [selectedMovie, setSelectedMovie] = useState(null);

 

  const openDialog = (movie, placement = "center") => {

    const completeMovie = {
      id: movie?.id || null,
      TrailerId: movie?.TrailerId || null,
      title: movie?.title || "Untitled",
      overview: movie?.overview || "No description available",
      srcImg: movie?.srcImg || null,
      ...movie // Spread any additional properties
    };
    
    setSelectedMovie(completeMovie);
    setPlacement(placement);
    onOpen();
  };

  console.log(selectedMovie)

  
  return { 
    isOpen, 
    onClose,  
    placement, 
    openDialog, 
    selectedMovie 
  };
};

export const DialogComponent = ({ 
  isOpen, 
  onClose, 
  placement = "center", 
  movie = {} // Default empty object
}) => {

    
  function openYouTubeVideo (videoId) {
    const url = `https://www.youtube.com/embed/${videoId}`;
    window.open(url, '_blank');
  }

  // Safe destructuring with defaults
  const {  id, TrailerId, title, overview, srcImg } = movie || {};
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement={placement} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.900" color="white">
        <ModalHeader 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
        >
          Overview
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody pb={6} display="flex" flexDirection="column" alignItems="center">
          {srcImg && (
            <Image 
              src={srcImg} 
              alt={title || "Movie poster"} 
              mb={4}
              borderRadius="md"
              w="12em"
              objectFit="cover"
            />
          )}
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {title || "Untitled Movie"}
          </Text>
          <Text mb={4} color="gray.300">
            {overview || "No description available"}
          </Text>
          
          {/* Safe ID check */}
          {TrailerId && (
            <Button 
              colorScheme="red" 
              mt={4}
              onClick={() => openYouTubeVideo(TrailerId)}
            >
              Watch Trailer
            </Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

DialogComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  placement: PropTypes.string,
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    srcImg: PropTypes.string,
    id:PropTypes.string
  })
};