import React from 'react'
import { View, Image } from 'react-native'
import { number, string } from 'prop-types'
import styled from 'styled-components'
import { colors } from '../theme'

const Container = styled(View)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-color: ${({ borderColor }) => borderColor};
  border-width: 2px;
  border-radius: 100px;
`

const Avatar = (props) => {
  const { uri } = props
  return (
    <Container {...props}>
      <StyledImage source={{ uri }} {...props} />
    </Container>
  )
}

Avatar.propTypes = {
  size: number,
  uri: string,
  borderColor: string
}

Avatar.defaultProps = {
  size: 100,
  uri: 'https://source.unsplash.com/random/people?300x300',
  borderColor: colors['textDefault']
}

export default Avatar
