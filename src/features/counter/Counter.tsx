import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCount } from './selector';
import { decrement, increment, reset } from './slice';
import styles from './Counter.module.css';

export const Counter = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

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
    </div>
  );
};
