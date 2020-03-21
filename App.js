import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import PasswordRecovery from './src/screens/PasswordRecovery';
import AccountActivation from './src/screens/AccountActivation';
import Profile from './src/screens/Profile';
import Typography from './src/components/Typography';
import initDeepLinking from './src/deeplinking';
import { navigationRef } from './src/RootNavigation';
import store from './src/store';
import { colors } from './src/theme';

const Stack = createStackNavigator();

const headerTitleStyle = {
  textTransform: 'uppercase',
  fontFamily: 'montserrat-bold',
  color: '#fff'
};

export default function App() {
  const [fontLoaded, setFontLoadingState] = React.useState(false);

  React.useLayoutEffect(() => {
    Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'), // eslint-disable-line global-require
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'), // eslint-disable-line global-require
    }).then(() => {
      setFontLoadingState(true);
      initDeepLinking();
    });
  }, []);

  return fontLoaded && (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerTitle: ({ children }) => (
            <Typography style={headerTitleStyle}>{children}</Typography>
          ),
          headerStyle: {
            backgroundColor: '#42D67D',
          },
          headerBackTitleVisible: false,
          headerTintColor: colors.secondary,
          headerLeftContainerStyle: { paddingLeft: 10 }
        }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
          />
          <Stack.Screen
            name="Password Recovery"
            component={PasswordRecovery}
          />
          <Stack.Screen
            name="Account Activation"
            component={AccountActivation}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
