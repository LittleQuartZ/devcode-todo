import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActivityList from './components/ActivityList';
import ActivityDetail from './components/ActivityDetail';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Toaster position='bottom-center' />
        <Navbar />
        <ActivityList />
      </>
    ),
  },
  {
    path: '/detail/:id',
    element: (
      <>
        <Toaster position='bottom-center' />
        <Navbar />
        <ActivityDetail />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
