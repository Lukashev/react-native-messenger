import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppStore from './src/store';
import Typography from './src/components/Typography';
/* SCREENS */
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import PasswordRecovery from './src/screens/PasswordRecovery';
import { colors } from './src/theme';
import AccountActivation from './src/screens/AccountActivation';


const store = createStore(
  AppStore,
  applyMiddleware(thunk)
);
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
    }).then(() => setFontLoadingState(true));
  }, []);

  return fontLoaded && (
    <Provider store={store}>
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
