export const fetchMovies = async (pageParam: string, movieTitle: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/?apikey=${
      import.meta.env.VITE_OMDB_KEY_API
    }&s=${movieTitle}&page=${pageParam}`
  );

  if (!response.ok) {
    console.error("Network response was not ok");
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return { ...data, prevOffset: pageParam };
};

export const fetchMovieDetails = async (imdbId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/?apikey=${
      import.meta.env.VITE_OMDB_KEY_API
    }&i=${imdbId}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return await res.json();
};
