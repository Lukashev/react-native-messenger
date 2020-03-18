import { connect } from 'react-redux';
import { changeStoreState } from '../../store';
import AccountActivation from './AccountActivation';

const mapStateToProps = ({ Auth }) => ({ Auth });
const mapDispatchToProps = (dispatch) => ({
  changeAuthState: (payload) => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountActivation);
