import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import SessionStore from '../stores/SessionStore';
import { observer } from "mobx-react";

const validator = require('email-validator');

class LoginScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: ''
    };
  }

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

//export default LoginScreen;
export default observer(LoginScreen);

//export default inject("store")(observer(ImageList));