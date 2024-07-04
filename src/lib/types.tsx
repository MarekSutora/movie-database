export type Rating = {
  Source: string;
  Value: string;
};

export type MovieBasic = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

export type MovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  imdbID: string;
};
