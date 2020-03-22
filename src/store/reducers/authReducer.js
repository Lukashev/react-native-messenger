const INITIAL_STATE = {
  email: '',
  password: '',
  retypedPassword: '',
  isAuthenticated: false,
  token: null,
  rememberMe: false,
  recoveryLinkSent: false,
  activationCode: '',
  activationCodeSent: false,
  emailValid: false,
  passwordValid: false,
  retypedPasswordValid: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_AUTH_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
