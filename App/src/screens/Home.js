import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {
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
          onPress={ () => this.props.navigation.navigate('Login')} 
        />
        <Button
          buttonStyle={styles.registerButton}
          titleStyle={styles.registerTitle}
          type='clear'
          title="Register"
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
  loginButton: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20
  },
  registerButton: {
    marginTop: 10
  },
  loginTitle: {
    color: '#20639B'
  },
  registerTitle: {
    color: 'white'
  }
});

export default HomeScreen;