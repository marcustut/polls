import { User } from 'firebase/auth';
import React from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import { LoadingPage } from '@/components/Element';
import { PollsRoutes } from '@/features/polls';

const App: React.FC = () => (
  <React.Suspense fallback={<LoadingPage />}>
    <Outlet />
  </React.Suspense>
);

const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <>Auth</> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

const protectedRoutes = (user: User) => [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to="polls" /> },
      { path: '/polls/*', element: <PollsRoutes user={user} /> },
    ],
  },
];

export const AppRoutes: React.FC = () => {
  const { data } = useSigninCheck();
  const element = useRoutes([
    ...(data.signedIn && data.user ? protectedRoutes(data.user) : publicRoutes),
  ]);
  return element;
};
