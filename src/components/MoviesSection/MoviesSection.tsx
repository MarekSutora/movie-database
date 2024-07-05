import { lazy, Suspense, useEffect, useRef } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./MoviesSection.module.scss";
import { MovieBasic } from "../../lib/types";

const MovieCard = lazy(() => import("../../components/MovieCard/MovieCard"));

type MoviesSectionProps = {
  movies: MovieBasic[];
  fetchNextPage: () => void;
  hasMore: boolean;
  isFetching: boolean;
};

const MoviesSection = ({
  movies,
  fetchNextPage,
  hasMore,
  isFetching,
}: MoviesSectionProps) => {
  const moviesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      moviesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }, []);

  return (
    <section className={styles.moviesSection} ref={moviesRef}>
      <InfiniteScroll
        className={styles.infiniteScrollContainer}
        dataLength={movies.length}
        next={fetchNextPage}
        hasMore={hasMore}
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
              <a
                key={movie.imdbID}
                href={`/movie-database/movie-details/${movie.imdbID}`}
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
              </a>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </section>
  );
};

export default MoviesSection;
