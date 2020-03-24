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
    const { result: profile, message, sessionExpired } = result;
    if (profile) {
      dispatch(changeStoreState('CHANGE_MAIN_STATE', { profile }))
    }
    if (sessionExpired)
      return dispatch(changeStoreState('CHANGE_AUTH_STATE', { isAuthenticated: false }))
    dispatch(triggerSnack(message))
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }));
  }
}

export const save = payload => async (dispatch, getState) => {
  delete payload.avatar
  const { Auth: { token }, Main: { profile } } = getState()
  try {
    const response = await fetch(`${API_URL}/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({ ...payload, _id: profile._id })
    });
    const result = await response.json();
    const { result: updatedProfile, message, sessionExpired } = result;
    if (result) {
      dispatch(changeStoreState('CHANGE_MAIN_STATE',
        {
          profile: {
            ...profile,
            ...updatedProfile
          }
        }))
    }
    if (sessionExpired)
      return dispatch(changeStoreState('CHANGE_AUTH_STATE', { isAuthenticated: false }))
    dispatch(triggerSnack(message))
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }));
  }
}

