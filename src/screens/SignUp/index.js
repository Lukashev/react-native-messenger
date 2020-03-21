import { connect } from 'react-redux';
import SignUp from './SignUp';
import { changeStoreState } from '../../store';
import { signup } from '../../store/actions/auth';

const mapStateToProps = ({ Auth, Snack }) => ({ Auth, Snack });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  submit: (navigation) => dispatch(signup(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
