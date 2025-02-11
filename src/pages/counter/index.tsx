import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { selectCount } from '@/redux/features/counter/selector';
import { decrement, increment, reset } from '@/redux/features/counter/slice';
import styles from './Counter.module.css';
import { Button } from 'antd';
import showNotification from '@/components/Notification';
import { axiosPrivate } from '@/config/axios';

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const fetchUsers = async () => {
    try {
      const response = await axiosPrivate.get('/users');
      console.log('Danh sách users:', response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách users:', error);
    }
  };

  fetchUsers();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Counter</h1>
      <div className={styles.counterControls}>
        <button className={styles.button} onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span className={styles.count}>{count}</span>
        <button className={styles.button} onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
      <button
        className={`${styles.button} ${styles.resetButton}`}
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
      <div>
        <Button
          onClick={() =>
            showNotification({
              type: 'success',
              message: 'Đăng nhập thành công!',
            })
          }
        >
          Hiển thị thông báo
        </Button>
      </div>
    </div>
  );
}
