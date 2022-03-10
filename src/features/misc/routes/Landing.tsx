import { Container, Spacer, Text, useTheme } from '@nextui-org/react';
import { collection, Query } from 'firebase/firestore';
import React, { useMemo } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import { ImageTick } from '@/components/Charts';
import { Navbar } from '@/components/Element';

// const data = [
//   {
//     name: 'Ship A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Ship B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Ship C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Ship D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Ship E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Ship F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Ship G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

interface Poll {
  id: string;
  votes: string[];
  imageUrl: string;
}

export const Landing: React.FC = () => {
  const pollsRef = collection(useFirestore(), 'polls') as Query<Poll>;
  const { status, data } = useFirestoreCollectionData(pollsRef);
  const { theme } = useTheme();

  const chartData = useMemo(
    () =>
      status === 'success'
        ? data.map(({ id, votes, imageUrl }) => ({
            id,
            imageUrl,
            votes: votes.length,
          }))
        : [],
    [status, data]
  );

  return (
    <Container>
      <Navbar title="Polls" />

      <Spacer y={2} />

      <ResponsiveContainer width="100%" height={780}>
        <BarChart data={chartData}>
          <Bar dataKey="votes" fill={theme?.colors.blue500.value} />
          <XAxis
            dataKey="imageUrl"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={<ImageTick />}
          />
        </BarChart>
      </ResponsiveContainer>

      <Text css={{ textAlign: 'center', marginTop: '$6' }}>
        tap on the character for an enlarged view
      </Text>
    </Container>
  );
};
