// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import "./index.scss";
import Layout from "./components/layout/Layout";
import FavoritesPage from "./pages/FavouritesPage/FavouritesPage";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <SearchPage />
        </Layout>
      ),
    },
    {
      path: "/movie-details",
      element: (
        <Layout>
          <DetailsPage />
        </Layout>
      ),
      children: [
        {
          path: "/movie-details/:imdbId",
          element: (
            <Layout>
              <DetailsPage />
            </Layout>
          ),
        },
      ],
    },
    {
      path: "/favorites",
      element: (
        <Layout>
          <FavoritesPage />
        </Layout>
      ),
    },
  ],
  { basename: "/movie-database" }
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </JotaiProvider>
    </ChakraProvider>
  </React.StrictMode>
);
