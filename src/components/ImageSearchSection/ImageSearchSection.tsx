import { Input, Button, Icon, Image } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import backgroundImage from "../../assets/pexels-photo-7991579.webp";
import styles from "./ImageSearchSection.module.scss";

type ImageSearchSectionProps = {
  movieTitle: string;
  setMovieTitle: (title: string) => void;
  handleSearch: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isFetching: boolean;
};

const ImageSearchSection = ({
  movieTitle,
  setMovieTitle,
  handleSearch,
  handleKeyPress,
  isFetching,
}: ImageSearchSectionProps) => {
  return (
    <section className={styles.imageSections}>
      <Image src={backgroundImage} alt="Background" className={styles.image} />
      <div className={styles.inputContainer}>
        <Input
          placeholder="Movie name..."
          value={movieTitle}
          colorScheme="gray"
          onChange={(e) => setMovieTitle(e.target.value)}
          onKeyDownCapture={handleKeyPress}
          backgroundColor="white"
          width="15rem"
          focusBorderColor="gray.500"
        />
        <Button
          onClick={handleSearch}
          colorScheme="gray"
          leftIcon={<Icon as={FaSearch} marginTop="2px" />}
          isLoading={isFetching}
        >
          Search
        </Button>
      </div>
    </section>
  );
};

export default ImageSearchSection;
