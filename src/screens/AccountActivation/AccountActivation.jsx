import React, { Component } from 'react'
import { Container, FormContainer, StyledButton, StyledButtonTypo } from '../Login/Login'
import { StyledTextField } from '../SignUp/SignUp'
import { changeAuthState } from '../../utils'

class AccountActivation extends Component {

    onSubmit = () => {}

    render() {
        const {
            Auth: {
                email,
                activationCodeSent,
                activationCode
            }
        } = this.props
        return (
            <Container>
                <FormContainer>
                    {activationCodeSent
                        ? <StyledTextField
                            label={'Code'}
                            onChangeText={changeAuthState('activationCode', this)}
                            value={activationCode}
                        />
                        : <StyledTextField
                            label={'Email'}
                            onChangeText={changeAuthState('email', this)}
                            value={email}
                        />}
                    <StyledButton onPress={this.onSubmit}>
                        <StyledButtonTypo>
                            {activationCodeSent ? `Activate` : `Get code` }
                        </StyledButtonTypo>
                    </StyledButton>
                </FormContainer>
            </Container>
        )
    }
}

export default AccountActivation
