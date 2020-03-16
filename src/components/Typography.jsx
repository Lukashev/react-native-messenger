import React from 'react'
import { Text } from 'react-native'
import { objectOf, any, oneOfType, array } from 'prop-types'
import styled from 'styled-components'

const Typography = (props) => {
    const { children } = props
    return (
        <StyledText {...props}>
            {children}
        </StyledText>
    )
}

const StyledText = styled(Text)`
   font-family: 'montserrat-regular';
   font-size: 16px; 
`

Typography.propTypes = {
    style: oneOfType([objectOf(any), array])
}

Typography.defaultProps = {
    style: {}
}

export default Typography
