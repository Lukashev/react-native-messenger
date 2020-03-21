import { connect } from 'react-redux';
import Login from './Login';
import { changeStoreState } from '../../store';
import { login } from '../../store/actions/auth';
import triggerSnack from '../../store/actions/snack';

const mapStateToProps = ({ Auth, Snack }) => ({ Auth, Snack });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  submit: (navigation) => dispatch(login(navigation)),
  triggerSnack: message => dispatch(triggerSnack(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
