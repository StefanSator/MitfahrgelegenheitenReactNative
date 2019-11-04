import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button, Icon, Avatar, Badge } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import AdvertiseStack from './Advertise/Advertise';

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.accountContainer}>
          <Avatar
            rounded
            size='large'
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => this.setState({ messages: this.state.messages + 1 })}
            activeOpacity={0.7}
          />
          <Badge
            status="error"
            containerStyle={styles.badgeStyle}
            value={this.state.messages}
          />
        </View>
        <Card title="Suche">
          <Text style={styles.cardText}>eine Mitfahrgelegenheit</Text>
          <Button style={styles.button}
            title="Leg los!"
            titleStyle={styles.buttonTitle}
            icon={
              <Icon
                name='search'
                type='feather'
                color='black'
              />
            }
          />
        </Card>
        <Card title="Inseriere">
          <Text style={styles.cardText}>eine Mitfahrgelegenheit</Text>
          <Button style={styles.button}
            title="Leg los!"
            titleStyle={styles.buttonTitle}
            icon={
              <Icon
                name='car'
                type='antdesign'
                color='black'
              />
            }
            onPress={() => this.props.navigation.navigate('Advertise')}
          />
        </Card>
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
    backgroundColor: "#20639B"
  },
  cardText: {
    alignSelf: "center",
    paddingBottom: 20
  },
  button: {
    paddingLeft: 75,
    paddingRight: 75
  },
  buttonTitle: {
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
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Advertise: AdvertiseStack
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
        }
        return <Icon name={iconName} type={iconType} color={tintColor} />;
      },
    }),
  }
);

export default createAppContainer(TabNavigator);