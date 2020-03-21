import * as React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef(); 

export const navigate = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params); // eslint-disable-line no-unused-expressions
  }
};

export const resetRouteStack = (routeName = 'Login') => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.dispatch( // eslint-disable-line no-unused-expressions
      CommonActions.reset({
        index: 1,
        routes: [
          { name: routeName }
        ],
      })
    );
  }
};
