import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import styled from 'styled-components'
/* COMPONENTS */
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { Switch } from 'react-native-gesture-handler'
import Typography from '../../components/Typography'
import { colors } from '../../theme'
import { redirect, changeAuthState } from '../../utils'

export const Container = styled(KeyboardAvoidingView)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors['background']};
    padding: 0 20px;
`
export const FormContainer = styled(View)`
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
    margin: 8px 0 0 0;
`

export const StyledButton = styled(Button)`
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

export const StyledButtonTypo = styled(Typography)`
    color: ${colors['secondary']};
    text-transform: uppercase;
`

const styles = StyleSheet.create({
    emailInputLabel: { marginTop: 0 }
})

class Login extends Component {

    onSubmit = () => {}

    render() {
        const { Auth: { email, password, rememberMe }, navigation } = this.props
        return (
            <Container behavior="padding" enabled>
                <FormContainer>
                    <TextField
                        label={'Email'}
                        value={email}
                        labelStyle={styles.emailInputLabel}
                        onChangeText={changeAuthState('email', this)}
                    />
                    <StyledTextField
                        label={'Password'}
                        value={password}
                        secureEnabled
                        onChangeText={changeAuthState('password', this)}
                    />
                    <SwitchContainer>
                        <Switch value={rememberMe} onValueChange={changeAuthState('rememberMe', this)} />
                        <SwitchText>Remember me</SwitchText>
                    </SwitchContainer>
                    <StyledButton onPress={this.onSubmit}>
                        <StyledButtonTypo>Submit</StyledButtonTypo>
                    </StyledButton>
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
