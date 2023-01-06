import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './index.css';
import Navbar from './components/Navbar';
import ActivityList from './components/ActivityList';
import ActivityDetail from './components/ActivityDetail';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Toaster position='bottom-center' />
    <Navbar />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <ActivityList />
      </RootLayout>
    ),
  },
  {
    path: '/detail/:id',
    element: (
      <RootLayout>
        <ActivityDetail />
      </RootLayout>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
