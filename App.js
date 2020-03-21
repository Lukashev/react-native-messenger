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
import initDeepLinking from './src/deeplinking';
import { navigationRef, isMountedRef } from './src/RootNavigation';
import store from './src/store';
import ProfileEditor from './src/screens/ProfileEditor';
import { stackOptions } from './src/utils';

import { connect } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator {...stackOptions}>
      <ProfileStack.Screen
        name='Profile Details'
        component={Profile}
      />
      <ProfileStack.Screen
        name='Profile Editor'
        component={ProfileEditor}
      />
    </ProfileStack.Navigator>
  )
}

function MenuFooter() {
  return (
    <Tab.Navigator lazy={false}>
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

function App({ isAuthenticated }) {
  const [fontLoaded, setFontLoadingState] = React.useState(false);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  React.useEffect(() => {
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
      <NavigationContainer ref={navigationRef} >
        {!isAuthenticated
          ? <Stack.Navigator {...stackOptions }>
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
          </Stack.Navigator>
          : <MenuFooter />}
      </NavigationContainer>
    </Provider>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});

App = connect(mapStateToProps)(App);

const AppWithStore = () => {
  return (
      <Provider store={store}>
          <App />
      </Provider>
  );
};

export default AppWithStore
