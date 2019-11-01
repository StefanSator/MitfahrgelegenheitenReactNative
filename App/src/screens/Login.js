import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

class LoginScreen extends React.Component {

  constructor() {
    super();
    this.email = 'email';
    this.password = 'password';
    this.state = {
      inputEmail: '',
      inputPassword: ''
    };
  }

  _checkInput() {
    if (this.state.inputEmail === this.email && this.state.inputPassword === this.password) {
      Alert.alert('Login Correct.');
    } else {
      Alert.alert('Login Incorrect.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          inputStyle={styles.input}
          autoCapitalize='none'
          placeholder='Email'
          leftIcon={{ type: 'feather', name: 'mail' }}
          onChangeText={(text) => this.setState({ inputEmail: text, inputPassword: this.state.inputPassword })}
        />
        <Input
          inputStyle={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => this.setState({ inputEmail: this.state.inputEmail, inputPassword: text })}
        />
        <Button
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginTitle}
          title="Login"
          icon={
            <Icon
              name='login'
              type='entypo'
              color='black'
            />
          }
          onPress={this._checkInput.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20639B"
  },
  input: {
    paddingLeft: 20,
    color: 'white'
  },
  loginButton: {
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  loginTitle: {
    color: '#20639B',
    paddingLeft: 5
  }
});

export default LoginScreen;