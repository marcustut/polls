import { Container, Spacer, Text, useTheme } from '@nextui-org/react';
import { collection, Query } from 'firebase/firestore';
import React, { useMemo } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import { ImageTick } from '@/components/Charts';
import { Navbar } from '@/components/Element';
import { Poll } from '@/features/polls';

export const Present: React.FC = () => {
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
