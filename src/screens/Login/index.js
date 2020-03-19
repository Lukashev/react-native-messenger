import { connect } from 'react-redux';
import Login from './Login';
import { changeStoreState } from '../../store';
import { login } from '../../store/actions/auth'

const mapStateToProps = ({ Auth, Snack }) => ({ Auth, Snack });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  submit: navigation => dispatch(login(navigation)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
