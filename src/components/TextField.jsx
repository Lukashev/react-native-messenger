import React from 'react'
import { string, objectOf, any } from 'prop-types'
import { TextInput, View } from 'react-native'
import styled from 'styled-components'
import Typography from './Typography'

const Container = styled(View)`
    flex-direction: column
`

const Label = styled(Typography)`
    color: #42D67D;
    margin: 8px 0;
`

const StyledTextInput = styled(TextInput)`
    background: #FFFFFF;
    border: 2px solid #42D67D;
    border-radius: 10px;
    height: 40px;
    padding: 0 15px;
`

const TextField = (props) => {
    const {
        label = 'Test',
        value = '0',
        style,
        inputStyle,
        labelStyle
    } = props
    return (
        <Container style={style}>
            <Label style={labelStyle}>{label}</Label>
            <StyledTextInput
                style={inputStyle}
                value={value}
            />
        </Container>
    )
}

TextField.propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    inputStyle: objectOf(any),
    labelStyle: objectOf(any)
}

TextField.defaultProps = {
    inputStyle: {},
    labelStyle: {}
}

export default TextField
