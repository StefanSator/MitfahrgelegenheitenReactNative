import React from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { Card, Button, Icon, Avatar, Badge } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import SessionStore from '../stores/SessionStore';
import { observer } from 'mobx-react';
/* Photo by adrian on Unsplash */
const image = require('../assets/images/street.jpeg');

import AdvertiseStack from './Advertise/Advertise';
import SearchStack from './Search/Search';
import AccountStack from './Account/Account';

/**
 * Class implementing the Home Screen Component.
 * @extends React.Component
 */
class HomeScreen extends React.Component {

  /**
   * Create the Home Screen Component.
   * @param {Object} props properties which are passed to the component.
   * Can be used for customizing the component.
   */
  constructor(props) {
    super(props);
  }

  /** Ends the current user session and switches to the StartScreen of the app. */
  _logoutUser() {
    /* End Session of User */
    SessionStore.endSession();
    /* Return to Start Screen of App */
    this.props.navigation.navigate('Start');
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <ImageBackground style={styles.container} source={image} blurRadius={10}>
        <View style={styles.cardGroup}>
          <Card title="Suche" containerStyle={styles.cardContainer} titleStyle={styles.cardTitle}>
            <Text style={styles.cardText}>eine Mitfahrgelegenheit</Text>
            <Button buttonStyle={styles.button}
              title="Leg los!"
              titleStyle={styles.buttonTitle}
              icon={
                <Icon
                  name='search'
                  type='feather'
                  color='#1089ff'
                />
              }
              onPress={() => this.props.navigation.navigate('Search')}
            />
          </Card>
          <Card title="Inseriere" containerStyle={styles.cardContainer} titleStyle={styles.cardTitle}>
            <Text style={styles.cardText}>eine Mitfahrgelegenheit</Text>
            <Button buttonStyle={styles.button}
              title="Leg los!"
              titleStyle={styles.buttonTitle}
              icon={
                <Icon
                  name='pluscircleo'
                  type='antdesign'
                  color='#1089ff'
                />
              }
              onPress={() => this.props.navigation.navigate('Advertise')}
            />
          </Card>
        </View>
        <View style={styles.logoutContainer}>
          <Button
            buttonStyle={styles.logoutButton}
            titleStyle={styles.logoutTitle}
            title="Logout"
            icon={
              <Icon
                name='log-out'
                type='entypo'
                color='black'
              />
            }
            onPress={this._logoutUser.bind(this)}
          />
        </View>
      </ImageBackground>
    );
  }
}

/**
 * Style Object for the HomeScreen Component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cardContainer: {
    backgroundColor: '#1089ff',
    borderWidth: 0,
    marginBottom: 20
  },
  cardTitle: {
    color: 'white'
  },
  cardText: {
    alignSelf: "center",
    color: 'white',
    paddingBottom: 20
  },
  button: {
    backgroundColor: 'white',
    marginLeft: 75,
    marginRight: 75
  },
  buttonTitle: {
    color: '#1089ff',
    paddingLeft: 10
  },
  logoutButton: {
    backgroundColor: "red",
    paddingLeft: 20,
    paddingRight: 20
  },
  logoutTitle: {
    color: 'black',
    paddingLeft: 5
  },
  cardGroup: {
    marginTop: 50
  }
});

/**
 * Tab Navigator for handling the Tab Navigation within the App.
 */
const TabNavigator = createBottomTabNavigator(
  {
    Home: observer(HomeScreen),
    Advertise: AdvertiseStack,
    Search: SearchStack,
    Account: AccountStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType;
        if (routeName === 'Home') {
          iconName = 'car';
          iconType = 'antdesign'
        } else if (routeName === 'Advertise') {
          iconName = 'pluscircleo';
          iconType = 'antdesign'
        } else if (routeName === 'Search') {
          iconName = 'search';
          iconType = 'feather';
        } else if (routeName === 'Account') {
          iconName = 'user';
          iconType ='feather';
        }
        return <Icon name={iconName} type={iconType} color={tintColor} />;
      },
    }),
    tabBarOptions: { // change this if ripple effect is lost in android
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: '#1089ff'
      }
    }
  }
);

export default createAppContainer(TabNavigator);