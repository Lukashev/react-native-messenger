import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import Button from '../../components/Button'

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = { token: null }
  }

  componentDidMount() {
    SecureStore.getItemAsync('token')
      .then(token => this.setState({ token }))
  }

  logout = async () => {
    await SecureStore.deleteItemAsync('token')
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View>
        <Text>{this.state.token}</Text>
        <Button onPress={this.logout}>Logout</Button>
      </View>
    )
  }
}

export default  Profile
