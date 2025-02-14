import { combineReducers } from 'redux';

// Import reducers
import counterReducer from '@/redux/features/counter/slice';
import userReducer from '@/redux/features/user/userSlice';

// Combine reducers
const rootReducers = combineReducers({
  counter: counterReducer,
  users: userReducer,
});

export default rootReducers;
