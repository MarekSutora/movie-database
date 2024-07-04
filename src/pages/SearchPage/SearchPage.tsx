import { useEffect, useRef, lazy, Suspense } from "react";
import {
  Input,
  Button,
  Icon,
  Image,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./SearchPage.module.scss";
import { useAtom } from "jotai";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { NavLink } from "react-router-dom";
import backgroundImage from "../../assets/pexels-photo-7991579.webp";
import { moviesAtom, movieTitleAtom } from "../../lib/store";
import { getErrorMessage } from "../../lib/utils";

const MovieCard = lazy(() => import("../../components/MovieCard/MovieCard"));

const fetchMovies = async (pageParam: string, movieTitle: string) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&s=${movieTitle}&page=${pageParam}`
  );

  if (!response.ok) {
    console.error("Network response was not ok");
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return { ...data, prevOffset: pageParam };
};

const SearchPage = () => {
  const [movieTitle, setMovieTitle] = useAtom(movieTitleAtom);
  const [movies, setMovies] = useAtom(moviesAtom);
  const moviesRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const { data, fetchNextPage, hasNextPage, refetch, isFetching, isFetched } =
    useInfiniteQuery({
      queryKey: ["movies", movieTitle],
      queryFn: async ({ pageParam = "1" }) => {
        try {
          const data = await fetchMovies(pageParam, movieTitle);

          if (pageParam === "1" && data.Response === "False") {
            toast({
              title: "No movies found.",
              description: "Try searching for something else.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
          }

          setMovies((prevMovies) => [
            ...(pageParam === "1" ? [] : prevMovies),
            ...(data.Search || []),
          ]);
          return data;
        } catch (error) {
          toast({
            title: "Error fetching movies.",
            description: getErrorMessage(error),
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          throw error;
        }
      },
      getNextPageParam: (lastPage) => {
        return lastPage.prevOffset
          ? (parseInt(lastPage.prevOffset) + 1).toString()
          : undefined;
      },
      initialPageParam: "1",
      enabled: false,
    });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (movieTitle.length >= 3) {
      setMovies([]);
      refetch();
    } else {
      toast({
        title: "Input too short.",
        description: "Please enter at least 3 characters.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isFetched && data?.pageParams.length === 1 && moviesRef.current) {
      moviesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data?.pageParams.length, isFetched, movies, moviesRef]);

  return (
    <>
      <section className={styles.imageSections}>
        <Image
          src={backgroundImage}
          alt="Background"
          className={styles.image}
        />
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
      <section className={styles.moviesSection} ref={moviesRef}>
        {movies.length > 0 && (
          <InfiniteScroll
            className={styles.infiniteScrollContainer}
            dataLength={movies.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              isFetching && (
                <Center>
                  <Spinner size="xl" color="white" />
                </Center>
              )
            }
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 500: 1, 768: 2, 1024: 3 }}
            >
              <Masonry gutter="1rem">
                {movies.map((movie) => (
                  <NavLink
                    key={movie.imdbID}
                    to={`/movie-details/${movie.imdbID}`}
                    className={styles.movieCard}
                  >
                    <Suspense
                      fallback={
                        <Center>
                          <Spinner size="md" color="white" />
                        </Center>
                      }
                    >
                      <MovieCard key={movie.imdbID} movie={movie} />
                    </Suspense>
                  </NavLink>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </InfiniteScroll>
        )}
      </section>
    </>
  );
};

export default SearchPage;
