import { connect } from 'react-redux';
import Profile from './Profile';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/auth';

const mapStateToProps = ({ Snack, Main }) => ({ Snack, Main });
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
