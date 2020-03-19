const INITIAL_STATE = {
  profile: {},
  dialogs: []
};

export const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_MAIN_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
