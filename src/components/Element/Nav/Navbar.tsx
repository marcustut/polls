import { Icon } from '@iconify/react';
import { Row, Text, Button, Col } from '@nextui-org/react';
import React from 'react';
import { useAuth, useUser } from 'reactfire';
import useDarkMode from 'use-dark-mode';

interface NavbarProps {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const auth = useAuth();
  const user = useUser();
  const { value, toggle } = useDarkMode();

  return (
    <Row justify="space-between" align="center">
      <Text h1>{title}</Text>
      <Col css={{ width: 'auto', display: 'flex' }}>
        <Button
          auto
          light
          icon={<Icon icon="mdi:instagram" />}
          onClick={() => window.open('https://www.instagram.com')}
        />
        <Button
          auto
          light
          icon={<Icon icon={value ? 'heroicons-outline:sun' : 'heroicons-outline:moon'} />}
          onClick={toggle}
        />

        {user && (
          <Button
            auto
            light
            icon={<Icon icon="heroicons-outline:logout" />}
            onClick={async () => await auth.signOut()}
          />
        )}
      </Col>
    </Row>
  );
};
