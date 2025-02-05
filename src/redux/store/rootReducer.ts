import { combineReducers } from 'redux';

// Import reducers
import counterReducer from '@/redux/features/counter/slice';

// Combine reducers
const rootReducers = combineReducers({
  counter: counterReducer,
});

export default rootReducers;
