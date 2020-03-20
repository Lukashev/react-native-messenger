import { connect } from 'react-redux';
import PasswordRecovery from './PasswordRecovery';
import { changeStoreState } from '../../store';
import { changePassword, getRecoveryLink } from '../../store/actions/auth';

const mapStateToProps = ({ Auth, Snack }) => ({ Auth, Snack });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  submit: recoveryLinkSent => !recoveryLinkSent ? dispatch(getRecoveryLink()) : dispatch(changePassword())
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
