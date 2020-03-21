import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
import * as SecureStore from 'expo-secure-store'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MenuFooter() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const headerTitleStyle = {
  textTransform: 'uppercase',
  fontFamily: 'montserrat-bold',
  color: '#fff'
};

export default function App() {
  const [fontLoaded, setFontLoadingState] = React.useState(false);
  const [isLoggedIn, setAuthState] = React.useState(false)

  React.useLayoutEffect(() => {
    Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'), // eslint-disable-line global-require
      'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'), // eslint-disable-line global-require
    }).then(() => {
      SecureStore.getItemAsync('token')
        .then(token => {
          if (token) setAuthState(true)

          setFontLoadingState(true);
          initDeepLinking();
        })
        .catch(console.error)
    });
  }, []);

  return fontLoaded && (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {!isLoggedIn 
          ? <Stack.Navigator
          screenOptions={{
            headerTitle: ({ children }) => (
              <Typography style={headerTitleStyle}>{children}</Typography>
            ),
            headerStyle: {
              backgroundColor: '#42D67D',
            },
            headerBackTitleVisible: false,
            headerTintColor: colors.secondary,
            headerLeftContainerStyle: { paddingLeft: 10 },

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
        : <MenuFooter />}
      </NavigationContainer>
    </Provider>
  );
}
