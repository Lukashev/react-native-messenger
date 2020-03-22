import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { objectOf, any, bool, func, string } from 'prop-types'
import Typography from './Typography'
import { colors } from '../theme'

const Container = styled(TouchableOpacity)`
    width: 140px;
    height: 55px;
    justify-content: center;
    align-items: center;
    opacity: ${props => props.disabled ? '0.3' : '1'};
    background-color: ${colors['primary']};
    border: 2px solid ${colors['secondary']};
    border-radius: 10px;
    text-transform: uppercase;
`

const Button = (props) => {
    const { 
        children, 
        typoStyle, 
        style, 
        showIndicator, 
        onPress, 
        disabled,
        textTransform,
        textColor 
    } = props
    return (
        <Container style={style} onPress={onPress} disabled={disabled}>
            {!showIndicator
                ? <Typography 
                    style={typoStyle || { 
                        textTransform,
                        color: textColor
                    }}>{children}</Typography>
                : <ActivityIndicator size='large' color='white' />
            }
        </Container>
    )
}

Button.propTypes = {
    typoStyle: objectOf(any),
    showIndicator: bool,
    onPress: func,
    disabled: bool,
    textTransform: string,
    textColor: string
}

Button.defaultProps = {
    typoStyle: null,
    showIndicator: false,
    onPress: () => {},
    disabled: false,
    textTransform: 'none',
    textColor: colors['secondary']
}

export default Button
