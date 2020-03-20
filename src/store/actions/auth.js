import { API_URL } from 'react-native-dotenv'
import * as SecureStore from 'expo-secure-store'
import { Linking } from 'expo'
/* Validators */
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

import { redirect, signUpFormValidation } from '../../utils'
import triggerSnack from './snack'
import * as RootNavigation from '../../RootNavigation'
import { changeStoreState } from '..'

const appURL = Linking.makeUrl('')

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
      RootNavigation.resetRouteStack('Profile')
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

export const getRecoveryLink = () => async (dispatch, getState) => {
  const { Auth: { email } } = getState()
  try {
    const promise = await fetch(`${API_URL}/auth/get_recovery_link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        appURL
      })
    })
    const response = await promise.json()
    const { result, message } = response
    if (!result) {
      dispatch(triggerSnack(message, { type: 'danger' }))
    } else {
      dispatch(triggerSnack(message, {
        callback: () => {
          RootNavigation.navigate('Login')
        }
      }))
    }
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}

export const changePassword = recoveryHash => async (dispatch, getState) => {
  const { Auth: { password, retypedPassword } } = getState()
  try {
    if (!isLength(password, { min: 6, max: undefined }))
      return signUpFormValidation(dispatch, 'Password must be longer than 6 characters', 'password')
    if (password.trim() !== retypedPassword.trim())
      return signUpFormValidation(dispatch, 'Passwords don`t match', 'retypedPassword')
    dispatch(changeStoreState('CHANGE_AUTH_STATE', {
      passwordValid: true,
      retypedPasswordValid: true
    }))

    const promise = await fetch(`${API_URL}/auth/change_password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        recoveryHash
      })
    })
    const response = await promise.json()
    const { result, message } = response
    if (!result) {
      dispatch(triggerSnack(message, { type: 'danger' }))
    } else {
      dispatch(triggerSnack(message, {
        callback: () => {
          dispatch(changeStoreState('CHANGE_AUTH_STATE', {
            password: '',
            retypedPassword: '',
            recoveryLinkSent: false
          }))
          RootNavigation.resetRouteStack('Login')
          RootNavigation.navigate('Login', { recoveryHash: null })
        }
      }))
    }

  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}

export const logout = () => async () => {
  const { resetRouteStack, navigate } = RootNavigation
  try {
    await SecureStore.deleteItemAsync('token')
    resetRouteStack('Login')
    navigate('Login')
  } catch (e) {
    dispatch(triggerSnack(e.message, { type: 'danger' }))
  }
}