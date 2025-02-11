import Header, { User } from '@/components/layout/Header';
import { Role } from '@/constants';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: Role.ADMIN, // Hoặc 'MANAGER' hoặc 'USER'
};

const Home = () => {
  return <Header />;
};

export default Home;
