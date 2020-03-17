import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { objectOf, any, bool } from 'prop-types'
import Typography from './Typography'

const Container = styled(TouchableOpacity)`
    width: 140px;
    height: 55px;
    justify-content: center;
    align-items: center;
    background-color: #42D67D;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    text-transform: uppercase;
`

const Button = (props) => {
    const { children, typoStyle, style, showIndicator } = props
    return (
        <Container style={style}>
            {!showIndicator
                ? <Typography style={typoStyle}>{children}</Typography>
                : <ActivityIndicator size='large' color='white' />
            }
        </Container>
    )
}

Button.propTypes = {
    typoStyle: objectOf(any),
    showIndicator: bool
}

Button.defaultProps = {
    typoStyle: {},
    showIndicator: false
}

export default Button
