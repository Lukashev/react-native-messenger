import React, { Component } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import { Container, FormContainer, StyledButton, StyledButtonTypo } from '../Login/Login'
import TextField from '../../components/TextField'
import { changeAuthState } from '../../utils'
import styled from 'styled-components'
import { colors } from '../../theme'
import SnackbarComponent from 'react-native-snackbar-component'

export const StyledTextField = styled(TextField)`
    margin-bottom: 8px;
`
class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = { showIndicator: false }
  }

  onSubmit = async () => {
    const { navigation } = this.props
    this.setState(state => ({ ...state, showIndicator: true }))
    await this.props.submit(navigation)
    this.setState(state => ({ ...state, showIndicator: false }))
  }

  render() {
    const {
      Auth: {
        email,
        password,
        retypedPassword,
        emailValid,
        passwordValid,
        retypedPasswordValid
      },
      Snack: {
        visible,
        message
      }
    } = this.props
    const { showIndicator } = this.state
    const someFieldEmpty = isEmpty(email) || isEmpty(password) || isEmpty(retypedPassword)
    const isValid = emailValid && passwordValid && retypedPasswordValid
    return (
      <Container behavior="padding" enabled>
        <SnackbarComponent
          visible={visible}
          textMessage={message}
          backgroundColor={!isValid ? 'red' : colors['primary']}
          messageColor={colors['secondary']}
          position='top'
          actionText={null}
        />
        <FormContainer>
          <StyledTextField
            label={'Email'}
            value={email}
            inputStyle={{
              borderColor: !emailValid && visible
                ? 'red'
                : colors['primary']
            }}
            onChangeText={changeAuthState('email', this)}
          />
          <StyledTextField
            label={'Password'}
            value={password}
            inputStyle={{
              borderColor: !passwordValid && visible
                ? 'red'
                : colors['primary']
            }}
            onChangeText={changeAuthState('password', this)}
            secureEnabled
          />
          <StyledTextField
            label={'Retype Password'}
            value={retypedPassword}
            inputStyle={{
              borderColor: !retypedPasswordValid && visible
                ? 'red'
                : colors['primary']
            }}
            onChangeText={changeAuthState('retypedPassword', this)}
            secureEnabled
          />
          <StyledButton
            disabled={!!someFieldEmpty}
            onPress={this.onSubmit}
            showIndicator={showIndicator}
          >
            <StyledButtonTypo>Submit</StyledButtonTypo>
          </StyledButton>
        </FormContainer>
      </Container>
    )
  }
}

export default SignUp
