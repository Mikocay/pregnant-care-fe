import { combineReducers } from 'redux';

// Import reducers
import authReducer from '@/redux/features/auth/slice';
import fetusReducer from '@/redux/features/fetus/slice';

// Combine reducers
const rootReducers = combineReducers({
  auth: authReducer,
  fetus: fetusReducer,
});

export default rootReducers;
