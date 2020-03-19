import React, { Component } from 'react'
import isEmpty from 'validator/lib/isEmpty'
import { Container, FormContainer, StyledButton, StyledButtonTypo, Link } from '../Login/Login'
import { StyledTextField } from '../SignUp/SignUp'
import { changeAuthState } from '../../utils'
import SnackbarComponent from 'react-native-snackbar-component'
import { colors } from '../../theme'

class AccountActivation extends Component {

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

  changeFormView = () => {
    changeAuthState('activationCodeSent', this)(false)
  }

  render() {
    const { showIndicator } = this.state
    const {
      Auth: {
        email,
        activationCodeSent,
        activationCode
      },
      Snack: {
        visible,
        message
      }
    } = this.props
    return (
      <Container behavior="padding" enabled>
        <SnackbarComponent
          visible={visible}
          textMessage={message}
          backgroundColor={colors['primary']}
          messageColor={colors['secondary']}
          position='top'
          actionText={null}
        />
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
          <StyledButton
            onPress={this.onSubmit}
            showIndicator={showIndicator}
            disabled={!!isEmpty(activationCode)}
          >
            <StyledButtonTypo>
              {activationCodeSent ? `Activate` : `Get code`}
            </StyledButtonTypo>
          </StyledButton>
          {activationCodeSent && (
            <Link onPress={this.changeFormView}>Get the code again!</Link>
          )}
        </FormContainer>
      </Container>
    )
  }
}

export default AccountActivation
