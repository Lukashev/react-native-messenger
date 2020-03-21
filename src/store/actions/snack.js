import { changeStoreState } from '..';

export const closeSnack = (time = 2000, callback) => (dispatch) => {
  setTimeout(() => {
    dispatch(changeStoreState('CHANGE_SNACK_STATE', {
      visible: false,
      message: null
    }));
    callback();
  }, time);
};

const triggerSnack = (message, { time, callback = () => {}, type = 'success' } = {}) => (dispatch) => {
  dispatch(changeStoreState('CHANGE_SNACK_STATE', { visible: true, message, type }));
  dispatch(closeSnack(time, callback));
};

export default triggerSnack;
