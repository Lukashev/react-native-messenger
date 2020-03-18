import { colors } from "./theme";

export const redirect = (routeName, navigation) => () => navigation.navigate(routeName);

export const changeAuthState = (key, scope) => (value) => {
  const { changeAuthState } = scope.props;
  changeAuthState({ [key]: value });
};

export const getSnackOptions = message => ({
  message,
  backgroundColor: colors['primary'],
  textColor: colors['secondary']
})