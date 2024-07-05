import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import Layout from "./components/layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const FavoritesPage = React.lazy(
  () => import("./pages/FavouritesPage/FavouritesPage")
);
const DetailsPage = React.lazy(() => import("./pages/DetailsPage/DetailsPage"));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/movie-database">
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <SearchPage />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/movie-details"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <DetailsPage />
                    </React.Suspense>
                  }
                >
                  <Route
                    path=":imdbId"
                    element={
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <DetailsPage />
                      </React.Suspense>
                    }
                  />
                </Route>
                <Route
                  path="/favorites"
                  element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <FavoritesPage />
                    </React.Suspense>
                  }
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </QueryClientProvider>
      </JotaiProvider>
    </ChakraProvider>
  </React.StrictMode>
);
