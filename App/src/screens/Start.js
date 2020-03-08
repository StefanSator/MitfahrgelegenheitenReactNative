import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Logo from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';

/**
 * Class implementing the Start Screen Component.
 * @extends React.Component
 */
class StartScreen extends React.Component {
  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <View style={styles.container}>
        <Logo
          name='car'
          size={150}
          color='white'
        />
        <Button
          buttonStyle={styles.loginButton}
          titleStyle={styles.loginTitle}
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          buttonStyle={styles.registerButton}
          titleStyle={styles.registerTitle}
          type='clear'
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
        <View style={styles.logo}>
          <Image
            source={require('../assets/images/oth-logo.png')}
            resizeMode='contain'
          />
        </View>
      </View>
    );
  }
}

/**
 * Style Object for the StartScreen Component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1089ff"
  },
  loginButton: {
    backgroundColor: "white",
    paddingLeft: 50,
    paddingRight: 50
  },
  registerButton: {
    marginTop: 10
  },
  loginTitle: {
    color: '#1089ff'
  },
  registerTitle: {
    color: 'white'
  },
  logo: {
    top: 0,
    left: 0,
    position: 'absolute',
    marginTop: 50,
    marginLeft: 20,
  }
});

export default StartScreen;