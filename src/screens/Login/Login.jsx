import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import styled from 'styled-components'
/* COMPONENTS */
import TextField from '../../components/TextField'
import Button from '../../components/Button'

const Container = styled(KeyboardAvoidingView)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #333232;
    padding: 0 20px;
`
const FormContainer = styled(View)`
    align-self: stretch;
`
const StyledTextField = styled(TextField)`
    margin: 12px 0 0 0;
`

const StyledButton = styled(Button)`
    width: 140px;
    align-self: center;
    margin: 25px 0;
`

const styles = StyleSheet.create({
    buttonTypoStyle: {
        textTransform: 'uppercase',
        color: 'white',
    },
    emailInputLabel: {
        marginTop: 0
    }
})

class Login extends Component {
    render() {
        return (
            <Container behavior="padding" enabled>
                <FormContainer>
                    <TextField
                        label={'Email'}
                        value='1'
                        labelStyle={styles.emailInputLabel}
                    />
                    <StyledTextField label={'Password'} value='1' />
                    <StyledButton typoStyle={styles.buttonTypoStyle}>Submit</StyledButton>
                </FormContainer>
            </Container>
        )
    }
}

export default Login
