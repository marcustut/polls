import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';

export const AppRoutes: React.FC = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const element = useRoutes([...commonRoutes]);

  return element;
};
