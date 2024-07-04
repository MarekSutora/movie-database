import { useState } from "react";
import { Spinner, Text, IconButton, Center } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./FavouritesPage.module.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { MovieBasic } from "../../lib/types";

const fetchMovieDetails = async (imdbId: string): Promise<MovieBasic> => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&i=${imdbId}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return await res.json();
};

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<string[]>(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favouriteMovies", favourites],
    queryFn: async () => {
      const moviesData = await Promise.all(
        favourites.map((imdbID) => fetchMovieDetails(imdbID))
      );
      return moviesData;
    },
    enabled: favourites.length > 0,
  });

  const handleRemoveFavourite = (imdbID: string) => {
    const updatedFavourites = favourites.filter((id) => id !== imdbID);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (isLoading) {
    return (
      <Center className={styles.favoritesPage}>
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center className={styles.favoritesPage}>
        Failed to load favourite movies.
      </Center>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Center className={styles.favoritesPage}>
        <Text color="white">No favourite movies found.</Text>
      </Center>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <section className={styles.moviesSection}>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 600: 1, 800: 2, 1000: 3 }}
        >
          <Masonry gutter="1rem" className={styles.masonryContainer}>
            {movies.map((movie) => (
              <NavLink
                key={movie.imdbID}
                to={`/movie-details/${movie.imdbID}`}
                className={styles.movieCard}
              >
                <MovieCard key={movie.imdbID} movie={movie}>
                  <IconButton
                    icon={<StarIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFavourite(movie.imdbID);
                    }}
                    colorScheme="yellow"
                    aria-label="Remove favourite"
                  />
                </MovieCard>
              </NavLink>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>
    </div>
  );
};

export default FavouritesPage;
