import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { mainReducer } from './reducers/mainReducer'
import { snackReducer } from './reducers/snackReducer'

export const changeStoreState = (type, payload) => ({ type, payload });

export default combineReducers({
  Auth: authReducer,
  Main: mainReducer,
  Snack: snackReducer
});
