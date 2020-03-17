import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';

export const changeStoreState = (type, payload) => ({ type, payload });

export default combineReducers({
  Auth: authReducer
});
