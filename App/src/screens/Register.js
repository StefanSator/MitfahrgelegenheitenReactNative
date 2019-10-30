import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

const validator = require('email-validator');

const passwordErrorMessages = {
  bad: 'Bad Password',
  average: 'Average Password',
  good: 'Good Password'
};

const passwordErrorStyles = {
  bad: { color: 'red' },
  average: { color: 'yellow' },
  good: { color: 'green' }
}


class RegisterScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: ''
    };
    this.errorStyle = passwordErrorStyles.bad;
    this.errorMessage = passwordErrorMessages.bad;
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

  _checkPasswordStrength(text) {
    if (text.length < 6) {
      this.errorStyle = passwordErrorStyles.bad;
      this.errorMessage = passwordErrorMessages.bad;
    } else if (text.length < 10) {
      this.errorStyle = passwordErrorStyles.average;
      this.errorMessage = passwordErrorMessages.average;
    } else {
      this.errorStyle = passwordErrorStyles.good;
      this.errorMessage = passwordErrorMessages.good;
    }
    this.setState({
      email: this.state.email,
      password1: text,
      password2: this.state.password2
    })
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
          onChangeText={this._checkPasswordStrength.bind(this)}
          errorStyle={this.errorStyle}
          errorMessage={this.errorMessage}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          secureTextEntry={true}
          label='Passwort bestätigen'
          placeholder='Passwort'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={this._checkPasswordStrength.bind(this)}
          errorStyle={this.errorStyle}
          errorMessage={this.errorMessage}
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