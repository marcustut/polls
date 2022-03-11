import { User } from 'firebase/auth';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Present } from './Present';
import { Vote } from './Vote';

interface PollsRoutesProps {
  user: User;
}

export const PollsRoutes: React.FC<PollsRoutesProps> = ({ user }) => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="vote" />} />
      <Route path="present" element={<Present />} />
      <Route path="vote" element={<Vote user={user} />} />
      <Route path="*" element={<Navigate to="vote" />} />
    </Routes>
  );
};
