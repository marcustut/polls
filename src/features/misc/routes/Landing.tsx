import { Container, Spacer, useTheme } from '@nextui-org/react';
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import { Navbar } from '@/components/Element';

const data = [
  {
    name: 'Ship A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Ship B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Ship C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Ship D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Ship E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Ship F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Ship G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const Landing: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <Navbar title="Polls" />

      <Spacer y={2} />

      <ResponsiveContainer width="100%" height={800}>
        <BarChart data={data}>
          <Bar dataKey="uv" fill={theme?.colors.blue500.value} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};
