import React, { Component } from 'react'
import { API_URL } from 'react-native-dotenv'
import SaveIcon from '../../icons/SaveIcon'
import { ProfileHeader } from '../Profile/Profile'
import { colors } from '../../theme'
import Avatar from '../../components/Avatar'
import Modal, { ModalContent, SlideAnimation, ModalTitle } from 'react-native-modals';
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native'
import styled from 'styled-components'
import TextField from '../../components/TextField'
import LocationPicker from '../../components/LocationPicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Button from '../../components/Button'
import SnackbarComponent from 'react-native-snackbar-component'
import ImageUploader from '../../components/ImageUploader'

export const MainContainer = styled(View)`
  flex: 1;
  padding: 25px 0 0 0;
  backgroundColor: ${colors['background']};
  align-self: stretch;
`

const StyledTextField = styled(TextField)`
  align-self: stretch;
  margin: 5px 20px;
`

const StyledButton = styled(Button)`
  margin: 16px 20px;
`

const Flex = styled(View)`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const modalWidth = Dimensions.get('window').width - 25

class ProfileEditor extends Component {

  scroll

  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      multilineLayout: null,
      modalVisible: false
    }
  }

  componentDidMount() {
    const { Main: { profile } } = this.props
    this.setState(state => ({
      ...state,
      profile
    }))
  }

  handleModalState = () => {
    const { modalVisible } = this.state
    this.setState(state => ({
      ...state,
      modalVisible: !modalVisible
    }))
  }

  handleChange = key => value => {
    this.setState(state => ({
      ...state,
      profile: {
        ...state.profile,
        [key]: value
      }
    }))
  }

  uploadAvatarAsync = uri => {
    const { Auth: { token }, Main: { profile } } = this.props

    let apiUrl = `${API_URL}/profile/avatar-upload`;

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    formData.append('profileId', profile._id)

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': token
      },
    };

    return fetch(apiUrl, options);
  }

  getPublicURL = url => {
    const { changeStoreState, Main: { profile } } = this.props
    changeStoreState('CHANGE_MAIN_STATE', {
      profile: {
        ...profile,
        avatar: url
      }
    })
    this.handleChange('avatar', url)
  }

  getLayout = ({ nativeEvent }) => {
    const { multilineLayout } = this.state
    if (!multilineLayout)
      this.setState(state => ({
        ...state,
        multilineLayout: nativeEvent.layout
      }))
  }

  handlePickerChange = ({ description }) => {
    this.handleChange('location')(description)
  }

  save = () => {
    const { profile } = this.state
    this.props.save(profile)
  }

  render() {
    const {
      profile: {
        name = '',
        age = '',
        location = '',
        description = ''
      },
      multilineLayout,
      modalVisible
    } = this.state

    const {
      Snack: { visible, message, type },
      triggerSnack,
      Main: { profile }
    } = this.props

    const flexProps = Platform.OS === 'ios' ? { flex: 1 } : { flexGrow: 1 }

    return (
      <MainContainer>
        <SnackbarComponent
          visible={visible}
          textMessage={message}
          backgroundColor={colors[type]}
          messageColor={colors['secondary']}
          position='top'
          actionText={null}
        />
        <ProfileHeader style={{ justifyContent: 'flex-end' }}>
          <SaveIcon fill={colors['primary']} onPress={this.save} />
        </ProfileHeader>
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{
            backgroundColor: colors['background'],
            alignItems: 'center',
            ...flexProps
          }}
          ref={ref => {
            this.scroll = ref;
          }}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <TouchableOpacity>
            <Avatar size={200} uri={profile.avatar} />
          </TouchableOpacity>
          <StyledTextField
            label={'Name'}
            onChangeText={this.handleChange('name')}
            value={name}
          />
          <StyledTextField
            label={'Age'}
            onChangeText={this.handleChange('age')}
            value={age.toString()}
            keyboardType={'numeric'}
          />
          <StyledTextField
            label={'FAQ'}
            onChangeText={this.handleChange('description')}
            value={description}
            multiline
            numberOfLines={6}
            inputStyle={{ paddingTop: 10 }}
            onLayout={this.getLayout}
            onFocus={() => {
              const y = multilineLayout?.y + multilineLayout.height
              this.scroll?.scrollTo({ x: 0, y: y * 1.5, animated: true })
            }
            }
          />
          <Flex>
            <StyledButton onPress={this.handleModalState}>
              LOCATION
        </StyledButton>
            <ImageUploader
              btnText={'AVATAR'}
              btnStyle={{ marginRight: 20 }}
              handleUpload={this.uploadAvatarAsync}
              getPublicURL={this.getPublicURL}
              triggerSnack={triggerSnack}
            />
          </Flex>
        </KeyboardAwareScrollView>
        <Modal
          visible={modalVisible}
          onTouchOutside={this.handleModalState}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          width={modalWidth}
          height={0.5}
          modalStyle={{
            borderWidth: 2,
            borderColor: colors['primary']
          }}
        >
          <ModalTitle
            title={'Location Picker'}
            style={{
              backgroundColor: colors['primary']
            }}
            textStyle={{
              color: colors['secondary'],
              fontFamily: 'montserrat-bold',
              fontSize: 18
            }}
          />
          <ModalContent style={{
            flex: 1,
            backgroundColor: colors['background'],
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <LocationPicker
              onPress={this.handlePickerChange}
              placeholder={location}
            />
            <Button onPress={this.handleModalState}>
              Cancel
              </Button>
          </ModalContent>
        </Modal>
      </MainContainer>
    )
  }
}


export default ProfileEditor