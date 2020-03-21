import React from 'react'
import triggerSnack from './store/actions/snack';
import { changeStoreState } from './store';
import { colors } from './theme';
import Typography from './components/Typography';

export const stackOptions = {
  screenOptions: {
    headerTitle: ({ children }) => (
      <Typography style={{
        textTransform: 'uppercase',
        fontFamily: 'montserrat-bold',
        color: '#fff'
      }}>{children}</Typography>
    ),
    headerStyle: {
      backgroundColor: colors['primary'],
    },
    headerBackTitleVisible: false,
    headerTintColor: colors['secondary'],
    headerLeftContainerStyle: { paddingLeft: 10 },
  }
}

export const redirect = (routeName, navigation) => () => navigation.navigate(routeName);

export const changeAuthState = (key, scope) => (value) => {
  const { changeAuthState: changeFieldState } = scope.props;
  changeFieldState({ [key]: value });
};

export const signUpFormValidation = (dispatch, message, key) => {
  const validation = {
    emailValid: true,
    passwordValid: true,
    retypedPasswordValid: true
  };
  validation[`${key}Valid`] = false;
  dispatch(changeStoreState('CHANGE_AUTH_STATE', validation));
  dispatch(triggerSnack(message, { type: 'danger' }));
};
