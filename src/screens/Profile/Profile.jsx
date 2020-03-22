import React, { Component } from 'react'
import { View } from 'react-native'
import Button from '../../components/Button'
import styled from 'styled-components'
import { colors } from '../../theme'
import SnackbarComponent from 'react-native-snackbar-component'
import ProfilePreview from '../../components/ProfilePreview'

export const MainContainer = styled(View)`
  flex: 1;
  background-color: ${colors['background']};
  padding: 0 20px;
`

class Profile extends Component {

  render() {
    const {
      logout,
      Snack: {
        visible,
        message,
        type
      }
    } = this.props
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
        <ProfilePreview />
      </MainContainer>
    )
  }
}

export default Profile
