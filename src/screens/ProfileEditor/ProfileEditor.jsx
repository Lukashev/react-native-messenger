import React, { Component } from 'react'
import SaveIcon from '../../icons/SaveIcon'
import { ProfileHeader } from '../Profile/Profile'
import { colors } from '../../theme'
import Avatar from '../../components/Avatar'
import { ScrollView, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components'
import TextField from '../../components/TextField'

export const MainContainer = styled(ScrollView)`
  background-color: ${colors['background']};
  padding: 25px 20px;
`

const StyledTextField = styled(TextField)`
  align-self: stretch;
  margin: 5px 0;
`

class ProfileEditor extends Component {

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
      <KeyboardAvoidingView style={{ flex: 1, lexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled>
        <MainContainer>
            <ProfileHeader style={{ justifyContent: 'flex-end' }}>
              <SaveIcon fill={colors['primary']} />
            </ProfileHeader>
              <TouchableOpacity>
                <Avatar size={200} />
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
              />
        </MainContainer>
      </KeyboardAvoidingView>
    )
  }
}


export default ProfileEditor