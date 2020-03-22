import { API_URL } from 'react-native-dotenv';
import triggerSnack from './snack';
import { changeStoreState } from '..';

export const getMe = () => async (dispatch, getState) => {
  const { Auth: { token } } = getState()
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-access-token': token 
      }
    });
    const result = await response.json();
    const { result: profile, message } = result;
    if (profile) {
      dispatch(changeStoreState('CHANGE_MAIN_STATE', { profile }))
    }
    dispatch(triggerSnack(message))
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }));
  }
} 