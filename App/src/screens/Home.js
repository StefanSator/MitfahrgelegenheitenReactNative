import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button, Icon, Avatar } from 'react-native-elements';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar
          containerStyle={styles.accountContainer}
          rounded
          size='large'
          icon={{ name: 'user', type: 'font-awesome' }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
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
          />
        </Card>
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
    marginTop: 20,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default HomeScreen;