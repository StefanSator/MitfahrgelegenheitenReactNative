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

class HomeScreen extends React.Component {

  /* static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon name={'search'} type='feather' color={tintColor} />;
    },
  }; */

  constructor(props) {
    super(props);
    this.state = {
      messages: 0
    };
  }

  _logoutUser() {
    /* End Session of User */
    SessionStore.endSession();
    /* Return to Start Screen of App */
    this.props.navigation.navigate('Start');
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={image} blurRadius={10}>
        <View style={styles.accountContainer}>
          <Avatar
            rounded
            size='large'
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => this.props.navigation.navigate('Account')}
            activeOpacity={0.7}
          />
          <Badge
            status="error"
            containerStyle={styles.badgeStyle}
            value={this.state.messages}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#20639B"
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
  accountContainer: {
    top: 0,
    left: 0,
    marginTop: 50,
    marginLeft: 20,
    position: 'absolute'
  },
  badgeStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  logoutContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 70,
    marginRight: 20
  },
  cardGroup: {
    marginTop: 50
  }
});

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
    tabBarOptions: { // TODO: change this if ripple effect is lost in android
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: '#1089ff'
      }
    }
  }
);

export default createAppContainer(TabNavigator);