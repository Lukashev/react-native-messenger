const INITIAL_STATE = {
  profile: {}
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_USER_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
