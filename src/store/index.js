import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { userReducer } from './reducers/userReducer'

export const changeStoreState = (type, payload) => ({ type, payload });

export default combineReducers({
  Auth: authReducer,
  User: userReducer
});
