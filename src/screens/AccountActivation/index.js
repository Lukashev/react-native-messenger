import { connect } from 'react-redux';
import { changeStoreState } from '../../store';
import AccountActivation from './AccountActivation';
import { activateAccount, getActivationCode } from '../../store/actions/auth';

const mapStateToProps = ({ Auth, Snack }) => ({ Auth, Snack });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  activateAccount: navigation => dispatch(activateAccount(navigation)),
  getActivationCode: () => dispatch(getActivationCode())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountActivation);
