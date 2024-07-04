import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Spinner,
  Image,
  Heading,
  Text,
  Stack,
  IconButton,
  Card,
  CardBody,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import styles from "./DetailsPage.module.scss";
import { MovieDetails } from "../../lib/types";
import { Tooltip } from "@chakra-ui/react";

const fetchMovieDetails = async (imdbId: string) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&i=${imdbId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const DetailsPage = () => {
  const { imdbId } = useParams<{ imdbId: string }>();
  const [favourites, setFavourites] = useState<string[]>(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery<MovieDetails>({
    queryKey: ["movieDetails", imdbId],
    queryFn: () => fetchMovieDetails(imdbId!),
  });

  const handleToggleFavourite = (imdbID: string) => {
    let updatedFavourites;
    if (favourites.includes(imdbID)) {
      updatedFavourites = favourites.filter((id) => id !== imdbID);
    } else {
      updatedFavourites = [...favourites, imdbID];
    }
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (isLoading || error) {
    return (
      <div className={styles.detailsPage}>
        <Center>
          {isLoading ? (
            <Spinner size="xl" color="white" />
          ) : (
            <Text color="white">Movie not found</Text>
          )}
        </Center>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.detailsPage}>
        <Center>
          <Text color="white">Movie not found</Text>
        </Center>
      </div>
    );
  }

  const isFavourite = favourites.includes(movie.imdbID);

  return (
    <div className={styles.detailsPage}>
      <Card
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
        height="auto"
        width={{ base: "100%", md: "80%" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <CardBody width={{ base: "100%", md: "50%" }}>
          <Stack spacing={3}>
            <Heading
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              {movie.Title}{" "}
              <Tooltip
                label="Add to favourites"
                aria-label="Add to favourites"
                fontSize={"md"}
              >
                <IconButton
                  icon={<StarIcon />}
                  onClick={() => handleToggleFavourite(movie.imdbID)}
                  colorScheme={isFavourite ? "yellow" : "gray"}
                  aria-label="Toggle favourite"
                  variant={isFavourite ? "solid" : "outline"}
                />
              </Tooltip>
            </Heading>
            <Text>
              <strong>Year:</strong> {movie.Year}
            </Text>
            <Text>
              <strong>Genre:</strong> {movie.Genre}
            </Text>
            <Text>
              <strong>Rated:</strong> {movie.Rated}
            </Text>
            <Text>
              <strong>Released:</strong> {movie.Released}
            </Text>
            <Text>
              <strong>Runtime:</strong> {movie.Runtime}
            </Text>
            <Text>
              <strong>Director:</strong> {movie.Director}
            </Text>
            <Text>
              <strong>Writer:</strong> {movie.Writer}
            </Text>
            <Text>
              <strong>Actors:</strong> {movie.Actors}
            </Text>
            <Text>
              <strong>Plot:</strong> {movie.Plot}
            </Text>
            <Text>
              <strong>Language:</strong> {movie.Language}
            </Text>
            <Text>
              <strong>Country:</strong> {movie.Country}
            </Text>
            <Text>
              <strong>Awards:</strong> {movie.Awards}
            </Text>
            <Stack spacing={1}>
              <strong>Ratings:</strong>
              {movie.Ratings.map((rating, index) => (
                <Text key={index}>
                  {rating.Source}: {rating.Value}
                </Text>
              ))}
            </Stack>
          </Stack>
        </CardBody>
        {movie.Poster !== "N/A" && (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            objectFit="cover"
            width={{ base: "100%", md: "50%" }}
            height={{ base: "100%", md: "100%" }}
          />
        )}
      </Card>
    </div>
  );
};

export default DetailsPage;
