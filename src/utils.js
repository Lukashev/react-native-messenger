import triggerSnack from './store/actions/snack';
import { changeStoreState } from './store';

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
