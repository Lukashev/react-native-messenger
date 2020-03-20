const INITIAL_STATE = {
  visible: false,
  message: null,
  type: 'success'
};

export const snackReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_SNACK_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
