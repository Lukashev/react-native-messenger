import React, { Component, Fragment } from 'react'
import { Container, FormContainer, StyledButtonTypo, StyledButton } from '../Login/Login'
import { StyledTextField } from '../SignUp/SignUp'
import { changeAuthState } from '../../utils'

class PasswordRecovery extends Component {

    onSubmit = () => {} 

    render() {
        const { Auth: { email, password, retypedPassword, recoveryLinkSent } } = this.props
        return (
            <Container behavior="padding" enabled>
                <FormContainer>
                    {!recoveryLinkSent
                        ? <StyledTextField
                            label={'Email'}
                            onChangeText={changeAuthState('email', this)}
                            value={email}
                        />
                        : <Fragment>
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
                        </Fragment>}
                    <StyledButton onPress={this.onSubmit}>
                        <StyledButtonTypo>
                            Submit
                        </StyledButtonTypo>
                    </StyledButton>
                </FormContainer>
            </Container>
        )
    }
}

export default PasswordRecovery