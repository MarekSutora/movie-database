import { useState } from "react";
import { Input, Button, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { MovieResponse, Movie } from "../lib/shared/types";
import styles from "./css/SearchPage.module.scss";
import { useAtom } from "jotai";
import { moviesAtom } from "../lib/shared/store";
import MoviesList from "../components/moviesList/MoviesList";

const fetchMovies = async (movieTitle: string): Promise<Movie[]> => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&s=${movieTitle}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: MovieResponse = await response.json();
  console.log(data);
  return data.Search;
};

const SearchPage = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useAtom(moviesAtom);

  const fetchAndSetMovies = async () => {
    console.log("fetching movies");
    const movies = await fetchMovies(movieTitle);
    setMovies(movies);
  };

  const { error, isLoading, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchAndSetMovies,
    enabled: false,
  });

  const handleSearch = () => {
    if (movieTitle) {
      refetch();
    }
  };

  return (
    <>
      <section className={styles.inputContainer}>
      <img
        src="/images/pexels-photo-7991579.webp"
        alt="Background"
        className={styles.image}
      />
        <Input
          placeholder="Movie name..."
          value={movieTitle}
          colorScheme="gray"
          onChange={(e) => setMovieTitle(e.target.value)}
          backgroundColor="white"
          width="15rem"
          focusBorderColor="gray.500"
        />
        <Button
          onClick={handleSearch}
          colorScheme="gray"
          leftIcon={<Icon as={FaSearch} marginTop="2px" />}
          isLoading={isLoading}
        >
          Search
        </Button>
      </section>
      {movies && <MoviesList />}
    </>
  );
};

export default SearchPage;
