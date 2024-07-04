import { useEffect, useRef, useState } from "react";
import { Input, Button, Icon, Image, Spinner, Center } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./SearchPage.module.scss";
import { useAtom } from "jotai";
import { moviesAtom } from "../../lib/shared/store";
import MovieCard from "../../components/MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { NavLink } from "react-router-dom";
import backgroundImage from "../../assets/pexels-photo-7991579.webp";

const fetchMovies = async (pageParam: string, movieTitle: string) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&s=${movieTitle}&page=${pageParam}`
  );

  if (!response.ok) {
    console.error("Network response was not ok");
    return;
  }
  const data = await response.json();
  return { ...data, prevOffset: pageParam };
};

const SearchPage = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useAtom(moviesAtom);
  const moviesRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, refetch, isFetching, isFetched } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: async ({ pageParam = "1" }) => {
        const data = await fetchMovies(pageParam, movieTitle);
        setMovies((prevMovies) => [
          ...(pageParam === "1" ? [] : prevMovies),
          ...(data.Search || []),
        ]);
        return data;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.prevOffset
          ? (parseInt(lastPage.prevOffset) + 1).toString()
          : undefined;
      },
      initialPageParam: "1",
      enabled: false,
    });

  const handleSearch = () => {
    if (movieTitle) {
      setMovies([]);
      refetch();
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
              <Center>
                <Spinner size="xl" color="white" />
              </Center>
            }
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 500: 1, 768: 2, 1024: 3 }}
            >
              <Masonry gutter="1rem" className={styles.masonryContainer}>
                {movies.map((movie) => (
                  <NavLink
                    key={movie.imdbID}
                    to={`/movie-details/${movie.imdbID}`}
                    className={styles.movieCard}
                  >
                    <MovieCard key={movie.imdbID} movie={movie} />
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
