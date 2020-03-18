export const redirect = (routeName, navigation) => () => navigation.navigate(routeName);

export const changeAuthState = (key, scope) => (value) => {
  const { changeAuthState } = scope.props;
  changeAuthState({ [key]: value });
};
