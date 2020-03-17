import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { objectOf, any, bool, func } from 'prop-types'
import Typography from './Typography'
import { colors } from '../theme'

const Container = styled(TouchableOpacity)`
    width: 140px;
    height: 55px;
    justify-content: center;
    align-items: center;
    background-color: ${colors['primary']};
    border: 2px solid ${colors['secondary']};
    border-radius: 10px;
    text-transform: uppercase;
`

const Button = (props) => {
    const { children, typoStyle, style, showIndicator, onPress } = props
    return (
        <Container style={style} onPress={onPress}>
            {!showIndicator
                ? <Typography style={typoStyle}>{children}</Typography>
                : <ActivityIndicator size='large' color='white' />
            }
        </Container>
    )
}

Button.propTypes = {
    typoStyle: objectOf(any),
    showIndicator: bool,
    onPress: func
}

Button.defaultProps = {
    typoStyle: {},
    showIndicator: false,
    onPress: () => {}
}

export default Button
