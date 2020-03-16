import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { objectOf, any } from 'prop-types'
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
    const { children, typoStyle, style } = props
    return (
        <Container style={style}>
            <Typography style={typoStyle}>{children}</Typography>
        </Container>
    )
}

Button.propTypes = {
    typoStyle: objectOf(any)
}

Button.defaultProps = {
    typoStyle: {}
}

export default Button
