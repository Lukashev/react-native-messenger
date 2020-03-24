import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileEditor from './ProfileEditor';
import { save } from '../../store/actions/profile';
import { changeStoreState } from '../../store';
import triggerSnack from '../../store/actions/snack';

const mapStateToProps = ({ Snack, Main, Auth }) => ({ Snack, Main, Auth });
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    save,
    changeStoreState,
    triggerSnack
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);