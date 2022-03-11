import { Icon } from '@iconify/react';
import { Button, Modal, Text } from '@nextui-org/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useAuth } from 'reactfire';

export const AuthModal: React.FC = () => {
  const auth = useAuth();
  const provider = new GoogleAuthProvider();

  return (
    <Modal blur open preventClose aria-labelledby="auth-modal-title">
      <Modal.Header>
        <Text id="auth-modal-title" size={18}>
          Login to{' '}
          <Text b size={18}>
            Continue
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body css={{ paddingBottom: '$10' }}>
        <Button
          shadow
          color="gradient"
          icon={<Icon icon="mdi:google" style={{ width: '1.2rem', height: '1.2rem' }} />}
          onClick={async () => await signInWithPopup(auth, provider)}
        >
          Sign In With Google
        </Button>
      </Modal.Body>
    </Modal>
  );
};
