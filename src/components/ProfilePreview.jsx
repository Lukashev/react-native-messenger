import React from 'react'
import { ScrollView } from 'react-native'
import { objectOf, any } from 'prop-types'
import Avatar from './Avatar'
import styled from 'styled-components'
import Typography from './Typography'
import { colors } from '../theme'
import Button from './Button'

export const Container = styled(ScrollView)`
  flex: 1;
  padding: 25px 0;
`

const ProfileTitle = styled(Typography)`
  font-family: 'montserrat-bold';
  font-size: 24px;
  padding: 16px 0 8px 0;
  color: ${colors['secondary']};
`

const ProfileLocation = styled(Typography)`
  font-size: 18px;
  color: ${colors['textDefault']};
`

const ProfileDescription = styled(Typography)`
  color: ${colors['textDefault']};
  padding: 25px 20px 6px 20px;
  line-height: 28px;
`

const ShowMoreButton = styled(Button)`
  border: none;
  background-color: transparent;
  padding-top: 0;
`

const ProfilePreview = (props) => {

  const [fullDescription, setShowMore] = React.useState(false)

  const {
    profile: {
      avatar,
      name = 'New Member',
      age = 'N/A',
      location = 'San Francisco, USA',
      description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    }
  } = props
  return (
    <Container contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      <Avatar size={200} uri={avatar} />
      <ProfileTitle>{name}, {age}</ProfileTitle>
      <ProfileLocation>{location}</ProfileLocation>
      <ProfileDescription
        numberOfLines={fullDescription ? null : 2}
      >
        {description}
      </ProfileDescription>
      <ShowMoreButton
        textTransform='uppercase'
        textColor={colors['primary']}
        onPress={() => setShowMore(!fullDescription)}
      >
        {!fullDescription ? `Show more` : `Hide`}
      </ShowMoreButton>
    </Container>
  )
}

ProfilePreview.propTypes = {
  profile: objectOf(any)
}

ProfilePreview.defaultProps = {
  profile: {}
}

export default ProfilePreview
