import { connect } from 'react-redux'
import Login from './Login';
import { changeStoreState } from '../../store';

const mapStateToProps = ({ Auth }) => ({ Auth })
const mapDispatchToProps = dispatch => ({
    changeAuthState: payload => dispatch(changeStoreState('CHANGE_AUTH_STATE', payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
