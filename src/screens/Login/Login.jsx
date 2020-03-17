import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import styled from 'styled-components'
/* COMPONENTS */
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { Switch } from 'react-native-gesture-handler'
import Typography from '../../components/Typography'
import { colors } from '../../theme'
import { redirect } from '../../utils'

const Container = styled(KeyboardAvoidingView)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors['background']};
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
    color: ${colors['secondary']};
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

const Link = styled(Typography)`
    align-self: center;
    text-decoration: underline;
    text-decoration-color: ${colors['primary']};
    text-transform: uppercase;
    color: ${colors['primary']};
    padding: 8px 0;
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

    navigateTo

    render() {
        const { Auth: { email, password, rememberMe }, navigation } = this.props
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
                    <Link onPress={redirect('Password Recovery', navigation)}>
                        Forgot password?
                    </Link>
                    <Link onPress={redirect('Sign Up', navigation)}>
                        Tap to sign up
                    </Link>
                </FormContainer>
            </Container>
        )
    }
}

export default Login
