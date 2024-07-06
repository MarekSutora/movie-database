import React, { lazy, Suspense } from "react";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { moviesAtom, movieTitleAtom } from "../../lib/store";
import { getErrorMessage } from "../../lib/utils";

const ImageSearchSection = lazy(
  () => import("../../components/ImageSearchSection/ImageSearchSection")
);
const MoviesSection = lazy(
  () => import("../../components/MoviesSection/MoviesSection")
);

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
  const toast = useToast();
  const { data, fetchNextPage, hasNextPage, refetch, isFetching } =
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

  return (
    <>
      <Suspense
        fallback={
          <Center>
            <Spinner size="xl" color="white" />
          </Center>
        }
      >
        <ImageSearchSection
          movieTitle={movieTitle}
          setMovieTitle={setMovieTitle}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
          isFetching={isFetching}
        />
      </Suspense>
      {movies.length > 0 && (
        <Suspense
          fallback={
            <Center>
              <Spinner size="xl" color="white" />
            </Center>
          }
        >
          <MoviesSection
            movies={movies}
            fetchNextPage={fetchNextPage}
            hasMore={hasNextPage}
            isFetching={isFetching}
            pageParamsLength={data?.pageParams.length}
          />
        </Suspense>
      )}
    </>
  );
};

export default SearchPage;
