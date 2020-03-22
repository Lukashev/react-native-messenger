import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileEditor from './ProfileEditor';

const mapStateToProps = ({ Snack, Main }) => ({ Snack, Main });
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);