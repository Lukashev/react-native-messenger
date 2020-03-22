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
import initDeepLinking from './src/deeplinking';
import { navigationRef, isMountedRef } from './src/RootNavigation';
import store, { changeStoreState } from './src/store';
import { stackOptions } from './src/utils';
import * as SecureStore from 'expo-secure-store'

import { connect } from 'react-redux';
import { colors } from './src/theme';
import triggerSnack from './src/store/actions/snack';
/* MENU ICONS */
import ProfileIcon from './src/icons/ProfileIcon'
import ChatIcon from './src/icons/ChatIcon';
import ExploreIcon from './src/icons/ExploreIcon';
import Typography from './src/components/Typography';
/* SCREENS */
import ProfileScreen from './src/screens/Profile';
import ExploreScreen from './src/screens/Explore';
import ChatScreen from './src/screens/Chat';
import ProfileEditorScreen from './src/screens/ProfileEditor';
import SettingsScreen from './src/screens/Settings';
import SettingsIcon from './src/icons/SettingsIcon';
import { getMe } from './src/store/actions/profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator {...stackOptions} initialRouteName='Profile Editor'>
      <ProfileStack.Screen
        name='Profile Details'
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name='Profile Editor'
        component={ProfileEditorScreen}
      />
    </ProfileStack.Navigator>
  )
}

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator {...stackOptions}>
      <ExploreStack.Screen
        name='Explore'
        component={ExploreScreen}
      />
    </ExploreStack.Navigator>
  )
}

function ChatStackScreen() {
  return (
    <ChatStack.Navigator {...stackOptions}>
      <ChatStack.Screen
        name='Chat'
        component={ChatScreen}
      />
    </ChatStack.Navigator>
  )
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator {...stackOptions} initialRouteName={'Settings'}>
      <ChatStack.Screen
        name='Settings'
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  )
}


function MainStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: colors['primary'],
        },
        labelStyle: {
          color: colors['secondary'],
        },
        style: {
          backgroundColor: colors['primary']
        }
      }
      }>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <ProfileIcon
              fill={focused ? colors['background'] : colors['secondary']}
            />
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Typography
                style={{
                  fontSize: 10,
                  color: focused ? colors['background'] : colors['secondary'],
                }}
              >Profile</Typography>
            )
          }
        }}
        name="Profile"
        component={ProfileStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <ExploreIcon
              fill={focused ? colors['background'] : colors['secondary']}
            />
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Typography
                style={{
                  fontSize: 10,
                  color: focused ? colors['background'] : colors['secondary'],
                }}
              >Explore</Typography>
            )
          }
        }}
        name="Explore"
        component={ExploreStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <ChatIcon
              fill={focused ? colors['background'] : colors['secondary']}
            />
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Typography
                style={{
                  fontSize: 10,
                  color: focused ? colors['background'] : colors['secondary'],
                }}
              >Chat</Typography>
            )
          }
        }}
        name="Chat"
        component={ChatStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <SettingsIcon
              fill={focused ? colors['background'] : colors['secondary']}
            />
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Typography
                style={{
                  fontSize: 10,
                  color: focused ? colors['background'] : colors['secondary'],
                }}
              >Settings</Typography>
            )
          }
        }}
        name="Settings"
        component={SettingsStackScreen}
      />
    </Tab.Navigator>
  );
}

function App({
  isAuthenticated,
  triggerSnack,
  changeAuthState,
  getMe
}) {
  const [fontLoaded, setFontLoadingState] = React.useState(false);

  React.useEffect(() => {
    isMountedRef.current = true;

    SecureStore.getItemAsync('token')
      .then(async token => {
        if (token) {
          changeAuthState({
            isAuthenticated: true,
            token
          })
          await getMe()
        }
      })
      .catch(e => triggerSnack(e.message))

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
          ? <Stack.Navigator {...stackOptions}>
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
          : <MainStack />}
      </NavigationContainer>
    </Provider>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(getMe()),
  changeMainState: payload => dispatch(changeStoreState('CHANGE_MAIN_STATE', payload)),
  changeAuthState: payload => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  triggerSnack: message => dispatch(triggerSnack(message))
})

App = connect(mapStateToProps, mapDispatchToProps)(App);

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore
