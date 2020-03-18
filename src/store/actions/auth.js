import { API_URL } from 'react-native-dotenv'
import { Snackbar } from 'react-native-snack'
import * as SecureStore from 'expo-secure-store'
import { getSnackOptions } from '../../utils'

export const login = () => async (_dispatch, getState) => {
  const { Auth: { email, password, rememberMe } } = getState()
  try {
    const result = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    })
    if (!result.token) {
      Snackbar.show(getSnackOptions(result.message))
    } else {
      await SecureStore.setItemAsync('token', result.token)
    }
  } catch(e) {
    console.log(API_URL, e)
    Snackbar.show(getSnackOptions(e.message))
  }
}