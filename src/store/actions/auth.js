import { API_URL } from 'react-native-dotenv'
import * as SecureStore from 'expo-secure-store'

/* Validators */
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

import { redirect, signUpFormValidation, resetRouteStack } from '../../utils'
import triggerSnack from './snack'
import { changeStoreState } from '..'

export const login = navigation => async (dispatch, getState) => {
  const { Auth: { email, password, rememberMe, activationCodeSent } } = getState()
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    })
    const result = await response.json()
    const { token, message, needActivation } = result
    if (!token) {
      if (needActivation) {
        if (!activationCodeSent) {
          dispatch(changeStoreState('CHANGE_AUTH_STATE', { activationCodeSent: true }))
        }
        dispatch(triggerSnack(message, { callback: () => redirect('Account Activation', navigation)() }))
      } else {
        dispatch(triggerSnack(message, { type: 'danger' }))
      }
    } else {
      await SecureStore.setItemAsync('token', token)
      resetRouteStack(navigation, 'Profile')
      redirect('Profile', navigation)()
    }
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}

export const signup = navigation => async (dispatch, getState) => {
  const {
    Auth: {
      email,
      password,
      retypedPassword
    }
  } = getState()
  if (!isEmail(email))
    return signUpFormValidation(dispatch, 'Invalid email', 'email')
  if (!isLength(password, { min: 6, max: undefined }))
    return signUpFormValidation(dispatch, 'Password must be longer than 6 characters', 'password')
  if (password.trim() !== retypedPassword.trim())
    return signUpFormValidation(dispatch, 'Passwords don`t match', 'retypedPassword')
  dispatch(changeStoreState('CHANGE_AUTH_STATE', {
    emailValid: true,
    passwordValid: true,
    retypedPasswordValid: true
  }))
  try {
    const promise = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const response = await promise.json()
    const { result, message } = response
    if (!result) {
      dispatch(triggerSnack(message, { type: 'danger' }))
    } else {
      dispatch(changeStoreState('CHANGE_AUTH_STATE', { activationCodeSent: true }))
      dispatch(triggerSnack(message, { callback: () => redirect('Account Activation', navigation)() }))
    }
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}

export const activateAccount = navigation => async (dispatch, getState) => {
  const {
    Auth: {
      email,
      activationCode
    }
  } = getState()
  try {
    const promise = await fetch(`${API_URL}/auth/account_activation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, activationCode }),
    })
    const response = await promise.json()
    const { result, message } = response
    if (!result) {
      dispatch(triggerSnack(message, { type: 'danger' }))
    } else {
      dispatch(triggerSnack(message, {
        callback: () => {
          dispatch(changeStoreState('CHANGE_AUTH_STATE', { activationCodeSent: false }))
          redirect('Login', navigation)()
        }
      }))
    }
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}

export const getActivationCode = () => async (dispatch, getState) => {
  const { Auth: { email } } = getState()
  try {
    const promise = await fetch(`${API_URL}/auth/account_activation?email=${email.trim()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await promise.json()
    const { result, message } = response
    if (!result) {
      dispatch(triggerSnack(message, { type: 'danger' }))
    } else {
      dispatch(triggerSnack(message, {
        callback: () => {
          dispatch(changeStoreState('CHANGE_AUTH_STATE', { activationCodeSent: true }))
        }
      }))
    }
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}

export const logout = () => { }