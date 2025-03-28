import { combineReducers } from 'redux';

// Import reducers
import authReducer from '@/redux/features/auth/slice';
import fetusReducer from '@/redux/features/fetus/slice';
import globalReducer from '@/redux/features/global/slice';
import userReducer from '@/redux/features/user/slice';

// Combine reducers
const rootReducers = combineReducers({
  auth: authReducer,
  fetus: fetusReducer,
  global: globalReducer,
  users: userReducer,
});

export default rootReducers;
