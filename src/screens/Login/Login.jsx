import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import styled from 'styled-components'
/* COMPONENTS */
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { Switch } from 'react-native-gesture-handler'
import Typography from '../../components/Typography'

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
const SwitchContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    margin: 25px 0 0 0;
`

const SwitchText = styled(Typography)`
    color: white;
    margin-left: 10px;
`

const StyledTextField = styled(TextField)`
    margin: 12px 0 0 0;
`

const StyledButton = styled(Button)`
    width: 140px;
    align-self: center;
    margin: 20px 0;
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

    changeAuthState = key => value => {
        const { changeAuthState } = this.props
        changeAuthState({ [key]: value })
    }

    render() {
        const { Auth: { email, password, rememberMe } } = this.props
        return (
            <Container behavior="padding" enabled>
                <FormContainer>
                    <TextField
                        label={'Email'}
                        value={email}
                        labelStyle={styles.emailInputLabel}
                        onChangeText={this.changeAuthState('email')}
                    />
                    <StyledTextField
                        label={'Password'}
                        value={password}
                        secureEnabled
                        onChangeText={this.changeAuthState('password')}
                    />
                    <SwitchContainer>
                        <Switch value={rememberMe} onValueChange={this.changeAuthState('rememberMe')} />
                        <SwitchText>Remember me</SwitchText>
                    </SwitchContainer>
                    <StyledButton typoStyle={styles.buttonTypoStyle}>Submit</StyledButton>
                </FormContainer>
            </Container>
        )
    }
}

export default Login
