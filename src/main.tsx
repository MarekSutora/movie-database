import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Layout from "./components/layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const FavouritesPage = React.lazy(
  () => import("./pages/FavouritesPage/FavouritesPage")
);

const router = createBrowserRouter([
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
        <DetailsPage />
      </Layout>
    ),
  },
  {
    path: "/favourites",
    element: (
      <Layout>
        <React.Suspense fallback={<div>Loading...</div>}>
          <FavouritesPage />
        </React.Suspense>
      </Layout>
    ),
  },
]);

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
