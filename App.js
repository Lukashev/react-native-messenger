import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

/* SCREENS */
import Login from './src/screens/Login';
import Typography from './src/components/Typography';

const Stack = createStackNavigator();

const headerTitleStyle = {
  textTransform: 'uppercase',
  fontFamily: 'montserrat-bold',
  fontSize: 24,
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
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerTitle: ({ children }) => <Typography style={headerTitleStyle}>{children}</Typography>,
      headerStyle: {
        backgroundColor: '#42D67D'
      }
    }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
