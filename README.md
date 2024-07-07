# Movie Application

This project is a React application that allows users to search for movies, view movie details, and manage their favorite movies.

## Implementation Details

### Pages and Functionality

#### Movie Search
- **URL**: `/`
- **Functionality**:
  - Contains a search input field and a search button at the top of the page.
  - Displays search results below the search input field with infinite scrolling.
  - Persists the last search and results when navigating away and back to the page.

#### Movie Detail
- **URL**: `/movie-details/:imdbId`
- **Functionality**:
  - Displays detailed information about a selected movie (title, year, genre, poster, etc.).
  - Includes a "star" icon next to the title to add or remove the movie from favorites.

#### My Favorite Movies
- **URL**: `/favourites`
- **Functionality**:
  - Lists favorite movies.
  - Allows navigation to movie detail and removal of movies from favorites.

### State Management

- **Jotai**: Used for global state management, maintaining fetched movies and the movie title to persist state when users navigate back.

### Asynchronous Calls

- **React Query**: Utilized for handling asynchronous calls to the OMDb API along with the fetch API.

### Styling

- **CSS Modules with SASS**: Used for scoped styling of components to ensure modular and maintainable styles.
- **Chakra UI**: Used as the component library for building the UI components.

## Project Structure

- **src**: Contains all the source code for the application.
  - **assets**: Contains static assets like images and styles.
  - **components**: Contains reusable UI components.
  - **lib**: Contains various utilities and types.
    - **constants**: Contains application constants.
    - **types**: Contains TypeScript type definitions.
    - **store**: Contains Jotai atoms for state management.
    - **utils**: Contains utility functions.
  - **pages**: Contains the main page components for routing (e.g., MovieSearch, MovieDetail, MyFavoriteMovies). 

## Deployment

The solution is deployed at: [Movie Application](https://mareksutora.github.io/movie-database/)
