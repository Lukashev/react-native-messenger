import { combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { authReducer } from './reducers/authReducer';
import { mainReducer } from './reducers/mainReducer'
import { snackReducer } from './reducers/snackReducer'

export const changeStoreState = (type, payload) => ({ type, payload });

const reducers = combineReducers({
  Auth: authReducer,
  Main: mainReducer,
  Snack: snackReducer
});

export default createStore(
  reducers,
  applyMiddleware(thunk)
);
