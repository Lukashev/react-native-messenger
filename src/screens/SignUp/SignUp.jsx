import React, { Component } from 'react'
import { Container, FormContainer, StyledButton, StyledButtonTypo } from '../Login/Login'
import TextField from '../../components/TextField'
import { changeAuthState } from '../../utils'
import styled from 'styled-components'

export const StyledTextField = styled(TextField)`
    margin-bottom: 8px;
`
class SignUp extends Component {
    render() {
        const { Auth: { email, password, retypedPassword } } = this.props
        return (
            <Container behavior="padding" enabled>
                <FormContainer>
                    <StyledTextField
                        label={'Email'}
                        value={email}
                        onChangeText={changeAuthState('email', this)}
                    />
                    <StyledTextField
                        label={'Password'}
                        value={password}
                        onChangeText={changeAuthState('password', this)}
                        secureEnabled
                    />
                    <StyledTextField
                        label={'Retype Password'}
                        value={retypedPassword}
                        onChangeText={changeAuthState('retypedPassword', this)}
                        secureEnabled
                    />
                    <StyledButton>
                        <StyledButtonTypo>Submit</StyledButtonTypo>
                    </StyledButton>
                </FormContainer>
            </Container>
        )
    }
}

export default SignUp
