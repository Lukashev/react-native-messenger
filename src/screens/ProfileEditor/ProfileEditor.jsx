import React, { Component } from 'react'
import SaveIcon from '../../icons/SaveIcon'
import { ProfileHeader } from '../Profile/Profile'
import { colors } from '../../theme'
import Avatar from '../../components/Avatar'
import { View, TouchableOpacity, findNodeHandle, Platform } from 'react-native'
import styled from 'styled-components'
import TextField from '../../components/TextField'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export const MainContainer = styled(View)`
  flex: 1;
  padding: 25px 20px;
  backgroundColor: ${colors['background']}
`

const StyledTextField = styled(TextField)`
  align-self: stretch;
  margin: 5px 0;
`

class ProfileEditor extends Component {

  scroll

  constructor(props) {
    super(props)
    this.state = { profile: {} }
  }

  componentDidMount() {
    const { Main: { profile } } = this.props
    this.setState(state => ({
      ...state,
      profile
    }))
  }

  handleChange = key => value => {
    this.setState(state => ({
      ...state,
      profile: {
        [key]: value
      }
    }))
  }

  render() {
    const {
      profile: {
        avatar,
        name = '',
        age = '',
        location = '',
        description = ''
      }
    } = this.state

    return (
      <MainContainer>
        <ProfileHeader style={{ justifyContent: 'flex-end' }}>
          <SaveIcon fill={colors['primary']} />
        </ProfileHeader>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll={(Platform.OS === 'ios')}
          contentContainerStyle={{
            backgroundColor: colors['background'],
            flex: 1,
            alignItems: 'center'
          }}
          ref={ref => {
            this.scroll = ref;
          }}
          extraHeight={200}
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
            label={'Location'}
            onChangeText={this.handleChange('location')}
            value={location}
          />
          <StyledTextField
            label={'Age'}
            onChangeText={this.handleChange('age')}
            value={age}
            keyboardType={'numeric'}
          />
          <StyledTextField
            label={'FAQ'}
            onChangeText={this.handleChange('description')}
            value={description}
            multiline
            numberOfLines={6}
            inputStyle={{ paddingTop: 10 }}
            onFocus={event => {
              this.scroll?.scrollToEnd({ animated: true })
            }
            }
          />
        </KeyboardAwareScrollView>
      </MainContainer>
    )
  }
}


export default ProfileEditor