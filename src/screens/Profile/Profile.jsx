import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { colors } from '../../theme'
import SnackbarComponent from 'react-native-snackbar-component'
import ProfilePreview from '../../components/ProfilePreview'
import LogoutIcon from '../../icons/LogoutIcon'
import EditIcon from '../../icons/EditIcon'

export const MainContainer = styled(View)`
  flex: 1;
  background-color: ${colors['background']};
  padding: 25px 20px;
`

export const ProfileHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

class Profile extends Component {

  toProfileEditor = () => {
    const { navigation } = this.props
    navigation.navigate('Profile Editor') 
  }

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
        <ProfileHeader>
          <LogoutIcon
            fill={colors['primary']}
            onPress={logout}
          />
          <EditIcon
            fill={colors['primary']}
            onPress={this.toProfileEditor}
          />
        </ProfileHeader>
        <ProfilePreview />
      </MainContainer>
    )
  }
}

export default Profile
