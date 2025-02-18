import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  console.log(accessToken);

  return <div>Home</div>;
};

export default Home;
