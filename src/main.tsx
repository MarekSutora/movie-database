// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import SearchPage from './pages/SearchPage';
import './index.scss';
import Layout from './components/layout/Layout';
import FavoritesPage from './pages/FavouritesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <SearchPage />
      </Layout>
    ),
  },
  {
    path: '/details',
    element: (
      <Layout>
        <DetailsPage />
      </Layout>
    ),
  },
  {
    path: '/favorites',
    element: (
      <Layout>
        <FavoritesPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
