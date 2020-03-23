import React, { Component } from 'react'
import SaveIcon from '../../icons/SaveIcon'
import { ProfileHeader } from '../Profile/Profile'
import { colors } from '../../theme'
import Avatar from '../../components/Avatar'
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import { View, TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components'
import TextField from '../../components/TextField'
import LocationPicker from '../../components/LocationPicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Typography from '../../components/Typography'
import Button from '../../components/Button'
import SnackbarComponent from 'react-native-snackbar-component'

export const MainContainer = styled(View)`
  flex: 1;
  padding: 25px 20px;
  backgroundColor: ${colors['background']};
  align-self: stretch;
`

const StyledTextField = styled(TextField)`
  align-self: stretch;
  margin: 5px 0;
`

const StyledButton = styled(Button)`
  margin: 16px 0;
`

const modalWidth = Dimensions.get('window').width - 25,
  modalHeight = Dimensions.get('window').height / 1.5

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
        avatar,
        name = '',
        age = '',
        location = '',
        description = ''
      },
      multilineLayout,
      modalVisible
    } = this.state

    const { Snack: { visible, message, type } } = this.props

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
          <TouchableOpacity onPress={this.save}>
            <SaveIcon fill={colors['primary']} />
          </TouchableOpacity>
        </ProfileHeader>
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{
            backgroundColor: colors['background'],
            flex: 1,
            alignItems: 'center'
          }}
          ref={ref => {
            this.scroll = ref;
          }}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <TouchableOpacity>
            <Avatar size={200} uri={avatar} />
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
          <StyledButton onPress={this.handleModalState}>
            Location
        </StyledButton>
        </KeyboardAwareScrollView>
        <Modal
          visible={modalVisible}
          onTouchOutside={this.handleModalState}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          width={modalWidth}
          height={modalHeight}
          modalStyle={{
            borderWidth: 2,
            borderColor: colors['primary']
          }}
        >
          <ModalContent style={{
            flex: 1,
            backgroundColor: colors['background']
          }}>
            <LocationPicker
              onPress={this.handlePickerChange}
              placeholder={location}
            />
          </ModalContent>
        </Modal>
      </MainContainer>
    )
  }
}


export default ProfileEditor