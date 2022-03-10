import { Container, Loading } from '@nextui-org/react';
import React from 'react';

export const LoadingPage: React.FC = () => {
  return (
    <Container css={{ height: '100vh' }} fluid display="flex" justify="center" alignItems="center">
      <Loading />
    </Container>
  );
};
