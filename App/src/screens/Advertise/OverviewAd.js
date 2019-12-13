import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Button, Icon } from 'react-native-elements';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

class OverviewAdScreen extends React.Component {

  static navigationOptions = {
    title: 'Überblick'
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  _acceptButtonPressed() {
    // TODO: Save Advertise in Database
  }

  _refuseButtonPressed() {
    this.props.navigation.navigate('Advertise');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text h2 style={styles.title}>Überblick</Text>
          <Text h4 style={styles.text}>Ziel: {LiftStore.lift.target.cityName}</Text>
          <Text h4 style={styles.text}>Mitfahrer: {LiftStore.lift.passengers}</Text>
          <Text h4 style={styles.text}>Datum: {`${LiftStore.lift.datetime.getDate()}.${LiftStore.lift.datetime.getMonth() + 1}.${LiftStore.lift.datetime.getFullYear()}`}</Text>
          <Text h4 style={styles.text}>Uhrzeit: {`${LiftStore.lift.datetime.getHours()}:${LiftStore.lift.datetime.getUTCMinutes()} Uhr`}</Text>
          <Text h4 style={styles.text}>Preis: {'' + LiftStore.lift.price + '€'}</Text>
          <Text h4 style={styles.text}>Event: {LiftStore.lift.event.eventTitle}</Text>
          <Text h4 style={styles.text}>Beschreibung: {LiftStore.lift.event.eventDescription}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.acceptButton}
            titleStyle={styles.buttonTitle}
            title="Einverstanden"
            icon={
              <Icon
                name='check'
                type='feather'
                color='white'
              />
            }
            onPress={this._acceptButtonPressed.bind(this)}
          />
          <Button
            buttonStyle={styles.refuseButton}
            titleStyle={styles.buttonTitle}
            title="Abbrechen"
            icon={
              <Icon
                name='cross'
                type='entypo'
                color='white'
              />
            }
            onPress={this._refuseButtonPressed.bind(this)}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: "white"
  },
  title: {
    color: '#1089ff',
    marginBottom: 20,
    alignSelf: 'center'
  },
  text: {
    marginBottom: 10,
    marginTop: 10
  },
  acceptButton: {
    backgroundColor: "#1089ff",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  refuseButton: {
    backgroundColor: "red",
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 32,
    borderRadius: 10
  },
  buttonTitle: {
    color: 'white',
    paddingLeft: 17
  },
  textContainer: {
    //flex: 2,
    alignSelf: 'center'
    //margin: 50
  },
  buttonContainer: {
    //flex: 1,
    alignSelf: 'center'
  }
});

export default observer(OverviewAdScreen);