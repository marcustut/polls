import { Button, Card, Col, Container, Grid, Loading, Modal, Text } from '@nextui-org/react';
import { User } from 'firebase/auth';
import { arrayUnion, collection, doc, Query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import { Navbar } from '@/components/Element';
import { Poll } from '@/features/polls';

interface VoteProps {
  user: User;
}

export const Vote: React.FC<VoteProps> = ({ user }) => {
  const firestore = useFirestore();
  const pollsRef = collection(firestore, 'polls') as Query<Poll>;
  const { status, data } = useFirestoreCollectionData(pollsRef);
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState<{ poll: Poll; open: boolean }>();

  const voted = useMemo(() => {
    if (status !== 'success') return;
    const a = data.find((poll) => poll.votes.includes(user.uid));
    return !!a;
  }, [status, data, user.uid]);

  useEffect(() => {
    if (voted) navigate('/polls/present', { replace: true });
  }, [navigate, voted]);

  const handleCloseConfirmation = () => {
    if (confirmation) setConfirmation({ ...confirmation, open: false });
  };

  const handleCardClick = (poll: Poll) => setConfirmation({ poll, open: true });

  const handleVote = async (poll: Poll) => {
    const pollRef = doc(firestore, 'polls', poll.NO_ID_FIELD);
    await updateDoc(pollRef, { votes: arrayUnion(user.uid) });
    handleCloseConfirmation();
  };

  return (
    <Container>
      <Navbar title="Polls" />

      <Text
        h2
        weight="bold"
        css={{
          textGradient: '45deg, $blue500 -20%, $pink500 50%',
          textAlign: 'center',
          lineHeight: '$xs',
          marginTop: '$4',
          marginBottom: '$4',
        }}
      >
        Which bundle do you want to vote for?
      </Text>

      {status === 'loading' ? (
        <Container
          css={{ height: status === 'loading' ? '80vh' : 'auto' }}
          fluid
          display="flex"
          justify="center"
          alignItems="center"
          gap={0}
        >
          <Loading type="points" />
        </Container>
      ) : (
        <Grid.Container gap={2} direction="column">
          {data.map(({ id, imageUrl, ...poll }) => (
            <Grid key={id}>
              <Card clickable cover onClick={() => handleCardClick({ id, imageUrl, ...poll })}>
                <Card.Header css={{ position: 'absolute', zIndex: 1, top: '$1' }}>
                  <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                      100 Ship Bundle
                    </Text>
                    <Text h4 color="white" transform="uppercase">
                      {id}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={imageUrl}
                  height={340}
                  width="100%"
                  alt={`${id}'s image`}
                  css={{ filter: 'brightness(80%)' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}

      {confirmation && (
        <Modal
          closeButton
          aria-labelledby="vote-confirmation-modal"
          open={confirmation.open}
          onClose={handleCloseConfirmation}
        >
          <Modal.Header>
            <Text>
              Are you sure you want to vote for <Text b>{confirmation.poll.id}</Text>
            </Text>
          </Modal.Header>
          <Modal.Footer>
            <Button auto flat color="error" onClick={handleCloseConfirmation}>
              No
            </Button>
            <Button auto onClick={() => handleVote(confirmation.poll)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};
