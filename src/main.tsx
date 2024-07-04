// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <SearchPage />
          </React.Suspense>
        </Layout>
      ),
    },
    {
      path: "/movie-details",
      element: (
        <Layout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <DetailsPage />
          </React.Suspense>
        </Layout>
      ),
      children: [
        {
          path: "/movie-details/:imdbId",
          element: (
            <Layout>
              <React.Suspense fallback={<div>Loading...</div>}>
                <DetailsPage />
              </React.Suspense>
            </Layout>
          ),
        },
      ],
    },
    {
      path: "/favorites",
      element: (
        <Layout>
          <React.Suspense fallback={<div>Loading...</div>}>
            <FavoritesPage />
          </React.Suspense>
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
