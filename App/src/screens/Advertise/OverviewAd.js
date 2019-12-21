import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';
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
    console.log(LiftStore.lift.event);
    return (
      <View style={styles.container}>
        <Card
          title="Wollen Sie folgende Mitfahrgelegenheit inserieren?"
          containerStyle={styles.cardContainer}
          titleStyle={styles.cardTitle}
        >
          <Text style={styles.cardText}>Start: {LiftStore.lift.start.cityName}</Text>
          <Text style={styles.cardText}>Ziel: {LiftStore.lift.target.cityName}</Text>
          <Text style={styles.cardText}>Mitfahrer: {LiftStore.lift.passengers}</Text>
          <Text style={styles.cardText}>Datum: {`${LiftStore.lift.datetime.getDate()}.${LiftStore.lift.datetime.getMonth() + 1}.${LiftStore.lift.datetime.getFullYear()}`}</Text>
          <Text style={styles.cardText}>Uhrzeit: {`${LiftStore.lift.datetime.getHours()}:${LiftStore.lift.datetime.getUTCMinutes()} Uhr`}</Text>
          <Text style={styles.cardText}>Event: {(LiftStore.lift.event !== null) ? LiftStore.lift.event.eventTitle : 'Private Fahrt'}</Text>
          {(LiftStore.lift.event !== null) ? <Text style={styles.cardText}>Eventbeschreibung: {LiftStore.lift.event.eventDescription}</Text> : null}
          <Text style={styles.cardText}>Preis: {LiftStore.lift.price} €</Text>
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
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  acceptButton: {
    backgroundColor: "#50d890",
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
  cardContainer: {
    backgroundColor: "#1089ff",
    borderRadius: 10
  },
  cardTitle: {
    color: 'white'
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    margin: 5
  }
});

export default observer(OverviewAdScreen);