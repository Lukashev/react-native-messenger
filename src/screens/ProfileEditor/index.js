import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileEditor from './ProfileEditor';
import { save } from '../../store/actions/profile';

const mapStateToProps = ({ Snack, Main }) => ({ Snack, Main });
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    save
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);