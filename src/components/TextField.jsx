import React, { useState, useMemo, useCallback } from 'react'
import { string, objectOf, any, bool, func } from 'prop-types'
import { TextInput, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import Typography from './Typography'
import EyeIcon from '../icons/EyeIcon'
import HiddenEyeIcon from '../icons/HiddenEyeIcon'
import { colors } from '../theme'

const Container = styled(View)`
    flex-direction: column;
    position: relative;
`

const Label = styled(Typography)`
    color: ${colors['primary']};
    margin: 8px 0;
`

const StyledTextInput = styled(TextInput)`
    background: #FFFFFF;
    border: 2px solid ${colors['primary']};
    border-radius: 10px;
    height: 40px;
    padding: 0 15px;
`

const TouchableEye = styled(TouchableOpacity)`
    position: absolute;
    right: 10px;
    top: 40px;
` 

const TextField = (props) => {

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { secureEnabled } = props 

    const changeSecureTextState = useCallback(() => setSecureTextEntry(!!!secureTextEntry), [secureTextEntry])

    const eyeIcon = useMemo(() => {
        return secureEnabled 
        ? <TouchableEye onPress={changeSecureTextState} s>
            {secureTextEntry ? <HiddenEyeIcon />  : <EyeIcon /> } 
        </TouchableEye>
        : null
    }, [secureTextEntry])

    const {
        label = 'Test',
        value = '0',
        style,
        inputStyle,
        labelStyle,
        onChangeText = () => {}
    } = props
    return (
        <Container style={style}>
            <Label style={labelStyle}>{label}</Label>
            <StyledTextInput
                style={inputStyle}
                value={value}
                secureTextEntry={secureEnabled ? secureTextEntry : false}
                onChangeText={onChangeText}
            />
            {eyeIcon}
        </Container>
    )
}

TextField.propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    onChangeText: func.isRequired, 
    inputStyle: objectOf(any),
    labelStyle: objectOf(any),
    secureEnabled: bool
}

TextField.defaultProps = {
    inputStyle: {},
    labelStyle: {},
    secureEnabled: false
}

export default TextField
