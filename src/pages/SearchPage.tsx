import React, { useState } from "react";
import { Input, Button, Icon, Image, Spinner } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./css/SearchPage.module.scss";
import { useAtom } from "jotai";
import { moviesAtom } from "../lib/shared/store";
import MovieCard from "../components/moviesList/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const fetchMovies = async (pageParam: string, movieTitle: string) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&s=${movieTitle}&page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return { ...data, prevOffset: pageParam };
};

const SearchPage = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useAtom(moviesAtom);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["movies", movieTitle],
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
      enabled: false, // Disable automatic fetching
    });

  const handleSearch = () => {
    if (movieTitle) {
      setMovies([]); // Clear movies before new search
      refetch();
    }
  };

  return (
    <>
      <section className={styles.imageSections}>
        <Image
          src="/images/pexels-photo-7991579.webp"
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
            isLoading={isFetchingNextPage}
          >
            Search
          </Button>
        </div>
      </section>
      {movies.length > 0 && (
        <section className={styles.moviesSection}>
          <InfiniteScroll
            className={styles.infiniteScrollContainer}
            dataLength={movies.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <Spinner size="xl" />
              </div>
            }
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 300: 1, 500: 2, 700: 3 }}
            >
              <Masonry gutter="1rem" className={styles.masonryContainer}>
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </InfiniteScroll>

          {/* {isFetchingNextPage && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Spinner size="xl" />
            </div>
          )} */}
        </section>
      )}
    </>
  );
};

export default SearchPage;
