import React, { useState, useMemo, useCallback } from 'react'
import { string, objectOf, any, bool, func, number } from 'prop-types'
import { TextInput, View, TouchableOpacity, Platform } from 'react-native'
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
    height: ${({ numberOfLines }) => (Platform.OS === 'ios' && numberOfLines) 
        ? `${(20 * numberOfLines)}px`
        : `${40}px`};
    padding: 0 15px;
`

const TouchableEye = styled(TouchableOpacity)`
    position: absolute;
    right: 10px;
    top: 40px;
`

const TextField = (props) => {

    const inputRef = React.createRef()

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { secureEnabled } = props

    const changeSecureTextState = useCallback(() => setSecureTextEntry(!!!secureTextEntry), [secureTextEntry])

    const eyeIcon = useMemo(() => {
        return secureEnabled
            ? <TouchableEye onPress={changeSecureTextState} s>
                {secureTextEntry ? <HiddenEyeIcon /> : <EyeIcon />}
            </TouchableEye>
            : null
    }, [secureTextEntry])

    const {
        label = 'Test',
        value = '0',
        style,
        inputStyle,
        labelStyle,
        onChangeText = () => { },
        keyboardType,
        multiline,
        numberOfLines,
        onContentSizeChange,
        onFocus,
        onLayout,
        editable
    } = props
    return (
        <Container style={style}>
            <Label style={labelStyle}>{label}</Label>
            <StyledTextInput
                ref={inputRef}
                style={inputStyle}
                value={value}
                secureTextEntry={secureEnabled ? secureTextEntry : false}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onContentSizeChange={onContentSizeChange}
                onFocus={event => { 
                    onFocus(event, inputRef) 
                }}
                onLayout={onLayout}
                editable={editable}
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
    secureEnabled: bool,
    keyboardType: string,
    multiline: bool,
    numberOfLines: number,
    onContentSizeChange: func,
    onFocus: func,
    onLayout: func,
    editable: bool
}

TextField.defaultProps = {
    inputStyle: {},
    labelStyle: {},
    secureEnabled: false,
    keyboardType: 'default',
    multiline: false,
    numberOfLines: null,
    onContentSizeChange: () => {},
    onFocus: () => {},
    onLayout: () => {},
    editable: true
}

export default TextField
