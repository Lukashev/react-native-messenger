import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import isEmpty from 'validator/lib/isEmpty'
import * as SecureStore from 'expo-secure-store'
import styled from 'styled-components'
import SnackbarComponent from 'react-native-snackbar-component'
/* COMPONENTS */
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { Switch } from 'react-native-gesture-handler'
import Typography from '../../components/Typography'
import { colors } from '../../theme'
import { redirect, changeAuthState } from '../../utils'
import * as RootNavigation from '../../RootNavigation'

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

export const Link = styled(Typography)`
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

	constructor(props) {
		super(props)
		this.state = { showIndicator: false }
	}

	componentDidMount() {
		SecureStore.getItemAsync('token')
			.then(token => {
				if (token)  {
					 const { navigate, resetRouteStack } = RootNavigation	
					 resetRouteStack('Profile')
					 navigate('Profile')
				}
			})
			.catch(console.error)
	}

	onSubmit = async () => {
		const { navigation } = this.props
		this.setState(state => ({ ...state, showIndicator: true }))
		await this.props.submit(navigation)
		this.setState(state => ({ ...state, showIndicator: false }))
	}

	render() {
		const { showIndicator } = this.state
		const {
			Auth: { email, password, rememberMe },
			Snack: { visible, message, type },
			navigation
		} = this.props
		const someEmpty = isEmpty(email) || isEmpty(password)
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
					<StyledButton onPress={this.onSubmit} showIndicator={showIndicator} disabled={!!someEmpty}>
						<StyledButtonTypo>Submit</StyledButtonTypo>
					</StyledButton>
					<Link onPress={() => {
						navigation.setParams({ recoveryHash: null })
						redirect('Password Recovery', navigation)()
					}
					}>
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
