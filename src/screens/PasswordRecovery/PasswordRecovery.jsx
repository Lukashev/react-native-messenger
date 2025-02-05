import React, { Component, Fragment } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import { Container, FormContainer, StyledButtonTypo, StyledButton } from '../Login/Login'
import { StyledTextField } from '../SignUp/SignUp'
import { changeAuthState } from '../../utils'
import SnackbarComponent from 'react-native-snackbar-component'
import { colors } from '../../theme'
import { Linking } from 'expo'

class PasswordRecovery extends Component {

  constructor(props) {
    super(props)
    this.state = { showIndicator: false }
  }

  onSubmit = async () => {
    const { submit, Auth: { recoveryLinkSent }, route } = this.props
    const { params = {} } = route
    this.setState(state => ({ ...state, showIndicator: true }))
    await submit(recoveryLinkSent, params.recoveryHash)
    this.setState(state => ({ ...state, showIndicator: false }))
  }

  render() {
    const {
      Auth: {
        email,
        password,
        retypedPassword,
        recoveryLinkSent,
        passwordValid,
        retypedPasswordValid
      },
      Snack: {
        visible,
        message,
        type
      }
    } = this.props
    const { showIndicator } = this.state
    return (
      <Container behavior="padding" enabled>
        <SnackbarComponent
          visible={visible}
          textMessage={message}
          backgroundColor={colors[type]}
          messageColor={colors['secondary']}
          position='top'
          actionText={null}
        />
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
                inputStyle={{
                  borderColor: !passwordValid && visible
                    ? colors['danger']
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
                    ? colors['danger']
                    : colors['primary']
                }}
                onChangeText={changeAuthState('retypedPassword', this)}
                secureEnabled
              />
            </Fragment>}
          <StyledButton
            onPress={this.onSubmit}
            disabled={!recoveryLinkSent ? !!isEmpty(email) : !!(isEmpty(password) || isEmpty(retypedPassword))}
            showIndicator={showIndicator}
          >
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