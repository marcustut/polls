import { useSigninCheck } from 'reactfire';

import { LoadingPage } from '@/components/Element';
import { AuthModal } from '@/features/auth';

export const AuthWrapper: React.FC = ({ children }) => {
  const { status, data } = useSigninCheck();
  if (status === 'loading') return <LoadingPage />;
  if (!children) throw new Error('children must be provided');

  return (
    <>
      {!data.signedIn && <AuthModal />}
      {children}
    </>
  );
};
