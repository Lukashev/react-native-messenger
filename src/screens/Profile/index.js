import { connect } from 'react-redux';
import Profile from './Profile';
import { logout } from '../../store/actions/auth';

const mapStateToProps = ({ Snack }) => ({ Snack });
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
