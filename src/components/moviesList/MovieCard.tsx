import { Card, CardBody, Text, Image, Stack, Heading } from "@chakra-ui/react";
import styles from "./MoviesList.module.scss";
import { NavLink } from "react-router-dom";
import { Movie } from "../../lib/shared/types";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <NavLink key={movie.imdbID} to={movie.imdbID} className={styles.movieCard}>
      <Card
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        _hover={{ transform: "scale(1.03)" }}
      >
        {movie.Poster !== "N/A" && (
          <Image
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "/path/to/default-image.jpg"
            }
            alt={movie.Title}
            objectFit="cover"
            width="100%"
            height="80%"
          />
        )}

        <CardBody>
          <Stack spacing="3">
            <Heading size="md">{movie.Title}</Heading>
            <Text color="gray.500" fontSize="sm">
              {movie.Year}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </NavLink>
  );
};

export default MovieCard;
