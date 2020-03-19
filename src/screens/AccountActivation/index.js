import { connect } from 'react-redux';
import { changeStoreState } from '../../store';
import AccountActivation from './AccountActivation';
import { activateAccount } from '../../store/actions/auth';

const mapStateToProps = ({ Auth, Snack }) => ({ Auth, Snack });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload)),
  submit: navigation => dispatch(activateAccount(navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountActivation);
