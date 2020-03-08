import React from 'react';
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { observer } from 'mobx-react';
import SessionStore from '../stores/SessionStore';

const validator = require('email-validator');

const passwordStrengthMessages = {
  bad: 'Bad Password',
  average: 'Average Password',
  good: 'Good Password'
};

const passwordStrengthStyles = {
  bad: { color: 'red' },
  average: { color: 'yellow' },
  good: { color: 'green' }
}

/**
 * Class implementing the Register Screen Component.
 * @extends React.Component
 */
class RegisterScreen extends React.Component {

  /**
   * Creates a new RegisterScreen Component.
   */
  constructor() {
    super();
    /** Local State Object of the Component. */
    this.state = {
      email: '',
      password1: '',
      password2: '',
      username: ''
    };
    this.errorStyle = passwordStrengthStyles.bad;
    this.errorMessage = passwordStrengthMessages.bad;
  }

  /**
   * Checks if Registration is correct.
   */
  _checkRegistration() {
    if (!this._checkEmail()) return;
    if (!this._checkUsername()) return;
    if (!this._checkPasswords()) return;
    this._registerUser();
  }

  /**
   * Registers user by sending a Request to the backend service.
   * After the Registration the user gets logged into the app.
   */
  async _registerUser() {
    try {
      if (! await this._checkIfUserAvailable()) {
        Alert.alert('Nutzer bereits vorhanden!')
        return;
      }
      let response = await fetch(BackendURL + '/customers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password1,
          email: this.state.email
        }),
      });
      let sessionToken = await response.json();
      // Set Session Token
      SessionStore.setSessionToken(sessionToken.customerid);
      Alert.alert('Registrierung erfolgreich!');
      this.props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /**
   * Checks if the User to register is already occupied in the system.
   */
  async _checkIfUserAvailable() {
    try {
      const encodedEmail = encodeURIComponent(this.state.email);
      let response = await fetch(BackendURL + '/customers?email=' + encodedEmail);
      let responseJSON = await response.json();
      if (Array.isArray(responseJSON) && responseJSON.length != 0) {
        return false
      }
      return true;
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /**
   * Checks if the Email Input has a correct format.
   */
  _checkEmail() {
    let correct = validator.validate(this.state.email);
    if (!correct) {
      Alert.alert('Not a valid Email.');
      return false;
    }
    return true;
    /* if (!this.state.email.endsWith('oth-regensburg.de')) {
      Alert.alert('Only emails from OTH Regensburg allowed.');
    } */
  }

  /**
   * Checks if the Username has a correct format.
   */
  _checkUsername() {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!this.state.username.match(usernameRegex)) {
      Alert.alert('Not a valid Username.');
      return false;
    }
    return true;
  }

  /**
   * Checks if the Password Input is not empty and the Password Confirmation is correct.
   */
  _checkPasswords() {
    if (this.state.password1 !== this.state.password2) {
      Alert.alert('Passwords are different.');
      return false;
    }
    if (this.state.password1 === null || this.state.password2 === null) {
      Alert.alert('Error: No Passwords found.');
      return false;
    }
    if (this.state.password1 === '' || this.state.password2 === '') {
      Alert.alert('No Password Input.')
      return false;
    }
    return true;
  }

  /**
   * Checks the password strength of the user input.
   * @param {String} text Password Input of the user. 
   */
  _checkPasswordStrength(text) {
    if (text.length < 6) {
      this.errorStyle = passwordStrengthStyles.bad;
      this.errorMessage = passwordStrengthMessages.bad;
    } else if (text.length < 10) {
      this.errorStyle = passwordStrengthStyles.average;
      this.errorMessage = passwordStrengthMessages.average;
    } else {
      this.errorStyle = passwordStrengthStyles.good;
      this.errorMessage = passwordStrengthMessages.good;
    }
    this.setState(this._changeState(null, text, null, null));
  }

  /**
   * Changes the local State Object of the RegisterScreen Component.
   * @param {String} email Email Input of the user.
   * @param {String} password1 Password Input of the user.
   * @param {String} password2 Password Confirmation Input of the user.
   * @param {String} username Username Input of the user.
   */
  _changeState(email = null, password1 = null, password2 = null, username = null) {
    if (email !== null) {
      this.state.email = email;
    }
    if (password1 !== null) {
      this.state.password1 = password1;
    }
    if (password2 !== null) {
      this.state.password2 = password2;
    }
    if (username !== null) {
      this.state.username = username;
    }
    return this.state;
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text h3 style={styles.title}>Registrierung</Text>
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          label='Deine Email-Adresse'
          placeholder='email@st.oth-regensburg.de'
          leftIcon={{ type: 'feather', name: 'mail', color: 'white' }}
          onChangeText={(text) => this.setState(this._changeState(text, null, null, null))}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          label='Dein Nutzername'
          placeholder='Nutzername'
          leftIcon={{ type: 'feather', name: 'user', color: 'white' }}
          onChangeText={(text) => this.setState(this._changeState(null, null, null, text))}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          autoCapitalize='none'
          secureTextEntry={true}
          label='Dein Passwort'
          placeholder='Passwort'
          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
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
          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
          onChangeText={(text) => this.setState(this._changeState(null, null, text, null))}
        />
        <Button
          buttonStyle={styles.registerButton}
          titleStyle={styles.registerTitle}
          title="Registrieren"
          icon={
            <Icon
              name='user-check'
              type='feather'
              color='black'
            />
          }
          onPress={this._checkRegistration.bind(this)}
        />
        <View style={styles.backButtonContainer}>
          <Button
            type="clear"
            icon={
              <Icon
                name='arrow-back'
                type='material-icons'
                color='black'
                size={35}
              />
            }
            onPress={() => this.props.navigation.navigate('Start')}
          />
        </View>
      </SafeAreaView>
    )
  }
}

/**
 * Style Object for the RegisterScreen Component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#1089ff"
  },
  title: {
    color: 'white',
    marginTop: 20
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
    color: '#1089ff',
    paddingLeft: 5
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 20,
    marginLeft: 10
  }
})

export default observer(RegisterScreen);