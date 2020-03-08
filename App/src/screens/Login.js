import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import SessionStore from '../stores/SessionStore';
import { observer } from "mobx-react";

const validator = require('email-validator');

/**
 * Class implementing the Home Screen Component.
 * @extends React.Component
 */
class LoginScreen extends React.Component {

  /**
   * Create the LoginScreen Component.
   */
  constructor() {
    super();
    /** Local State Object of the Component. */
    this.state = {
      inputEmail: '',
      inputPassword: ''
    };
  }

  /**
   * Checks if Login is correct.
   */
  async _checkLogin() {
    if (!this._checkEmail()) return;
    try {
      let authResponse = await this._validate();
      if (authResponse.successful === false) {
        Alert.alert('Login Incorrect.');
        return;
      } else {
        // Set Session Token
        SessionStore.setSessionToken(authResponse.sessiontoken);
        // Navigate to Home Screen
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /**
   * Sends Validation Request to the Backend Service to validate if Login Input of user is correct.
   */
  async _validate() {
    try {
      let response = await fetch(BackendURL + '/customers/validate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.inputEmail,
          password: this.state.inputPassword
        }),
      });
      let responseJSON = await response.json();
      console.log('Response: ' + JSON.stringify(responseJSON));
      return responseJSON;
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      return false;
    }
  }

  /**
   * Checks if Email Input has a valid format.
   */
  _checkEmail() {
    console.log("Email: " + this.state.inputEmail);
    let correct = validator.validate(this.state.inputEmail);
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
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <View style={styles.container}>
        <Input
          inputStyle={styles.input}
          autoCapitalize='none'
          placeholder='Email'
          leftIcon={{ type: 'feather', name: 'mail', color: 'white' }}
          onChangeText={(text) => this.setState({ inputEmail: text, inputPassword: this.state.inputPassword })}
        />
        <Input
          inputStyle={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
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
          onPress={this._checkLogin.bind(this)}
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
      </View>
    );
  }
}

/**
 * Style Object for the LoginScreen Component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1089ff"
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
    color: '#1089ff',
    paddingLeft: 5
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 50,
    marginLeft: 10
  }
});

export default observer(LoginScreen);