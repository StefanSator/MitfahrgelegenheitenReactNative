import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

const validator = require('email-validator');

class RegisterScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: ''
    };
  }

  _checkInput() {
    this._checkEmail();
    this._checkPasswords();
    Alert.alert('Checked Input.');
  }

  _checkEmail() {
    let correct = validator.validate(this.state.email);
    if (!correct) {
      Alert.alert('Not a valid Email.');
    }
  }

  _checkPasswords() {
    if (this.state.password1 !== this.state.password2) {
      Alert.alert('Passwords are different.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h3 style={styles.text}>Registrierung</Text>
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          label='Deine Email-Adresse'
          placeholder='email@st.oth-regensburg.de'
          leftIcon={{ type: 'feather', name: 'mail' }}
          onChangeText={(text) => this.setState({
            email: text,
            password1: this.state.password1,
            password2: this.state.password2
          })}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          secureTextEntry={true}
          label='Dein Passwort'
          placeholder='Passwort'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => this.setState({
            email: this.state.email,
            password1: text,
            password2: this.state.password2
          })}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          secureTextEntry={true}
          label='Passwort bestätigen'
          placeholder='Passwort'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => this.setState({
            email: this.state.email,
            password1: this.state.password1,
            password2: text
          })}
        />
        <Button
          buttonStyle={styles.registerButton}
          titleStyle={styles.registerTitle}
          title="Registrieren"
          onPress={this._checkInput.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#20639B"
  },
  text: {
    color: 'white'
  },
  input: {
    paddingLeft: 20,
    color: 'white'
  },
  label: {
    color: 'white',
    marginBottom: 5,
    paddingLeft: 5
  },
  registerButton: {
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 50,
    paddingRight: 50
  },
  registerTitle: {
    color: '#20639B'
  }
})

export default RegisterScreen;