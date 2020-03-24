import React, { Component } from 'react'
import { View } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import Button from './Button';
import { string, func, objectOf, any } from 'prop-types';

class ImageUploader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uploading: false
    }
  }

  pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.handleImagePicked(pickerResult);
    }
  }

  handleImagePicked = async pickerResult => {
    const { triggerSnack, getPublicURL, handleUpload } = this.props
    let uploadResponse, uploadResult;

    try {
      this.setState(state => ({ ...state, uploading: true }));

      if (!pickerResult.cancelled) {
        uploadResponse = await handleUpload(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        if (triggerSnack) triggerSnack(uploadResult.message)

        getPublicURL(uploadResult.publicUrl)
      }
    } catch (e) {
      triggerSnack ? triggerSnack(e.message, { type: 'danger' }) : console.error(e.message)
    } finally {
      this.setState(state => ({ ...state, uploading: false }));
    }
  };

  render() {
    const { btnText, btnStyle, icon } = this.props
    const { uploading } = this.state
    return (
      <View>
        <Button onPress={this.pickImage} style={btnStyle} showIndicator={uploading}>
          {icon || btnText}
        </Button>
      </View>
    )
  }
}


ImageUploader.propTypes = {
  btnText: string,
  btnStyle: objectOf(any),
  getPublicURL: func.isRequired,
  triggerSnack: func,
  handleUpload: func.isRequired,
  icon: any
}

ImageUploader.defaultProps = {
  btnText: 'Upload',
  handleUpload: () => { },
  getPublicURL: () => { },
  triggerSnack: null,
  icon: null
}

export default ImageUploader

