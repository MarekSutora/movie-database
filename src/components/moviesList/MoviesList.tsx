
import { useAtom } from "jotai";
import { Text, Image } from "@chakra-ui/react";
import { moviesAtom } from "../../lib/shared/store";
import  styles  from "./MoviesList.module.scss";

const MoviesList= () => {
  const [movies] = useAtom(moviesAtom);

  return (
    <div className={styles.moviesContainer}>
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <Image
            src={movie.Poster}
            alt={movie.Title}
          />
          <div>
            <Text fontWeight="bold">
              {movie.Title} ({movie.Year})
            </Text>
            <Text>{movie.Plot}</Text>
            <Text>Rating: {movie.imdbRating}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
