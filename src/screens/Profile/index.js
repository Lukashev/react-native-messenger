import { connect } from 'react-redux';
import Profile from './Profile';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/auth';
import { getMe } from '../../store/actions/profile';

const mapStateToProps = ({ Snack, Main }) => ({ Snack, Main });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout,
    getMe
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
