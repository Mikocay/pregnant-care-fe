import { combineReducers } from 'redux';

// Import reducers
import counterReducer from '@/redux/features/counter/slice';
import authReducer from '@/redux/features/auth/slice';
import fetusReducer from '@/redux/features/fetus/slice';

// Combine reducers
const rootReducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  fetus: fetusReducer,
});

export default rootReducers;
