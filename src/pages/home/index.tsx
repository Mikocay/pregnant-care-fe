import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const { accessToken, userId } = useSelector((state: RootState) => state.auth);
  console.log('accessToken', accessToken);
  console.log('userId', userId);

  return <div>Home</div>;
};

export default Home;
