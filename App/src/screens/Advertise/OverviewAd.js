import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Icon } from 'react-native-elements';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

/**
 * Class implementing the OverviewAdScreen Component.
 * Shows a Overview of the Input Informations for the Lift to Advertise.
 * @extends React.Component
 */
class OverviewAdScreen extends React.Component {

  static navigationOptions = {
    title: 'Überblick'
  };

  /**
   * Create a new OverviewAdScreen Component.
   * @param {Object} props properties which are passed to the component.
   */
  constructor(props) {
    super(props);
    /** Local State Object of the Component. */
    this.state = {
      isVisible: true
    };
  }

  /**
   * Gets triggered if the user clicks the Accept Button.
   * Calls the saveLiftAdvertisement() function and ends the Advertise Process.
   */
  _acceptButtonPressed() {
    this._saveLiftAdvertisement();
    this.props.navigation.navigate('Advertise');
    Alert.alert("Mitfahrgelegenheit gespeichert.");
  }

  /**
   * Gets triggered if the user clicks the Cancel Button.
   * Ends the Advertise Process, without saving the Lift.
   */
  _refuseButtonPressed() {
    this.props.navigation.navigate('Advertise');
  }

  /**
   * Saves the newly advertised Lift in the Database by sending a Request to the Backend Service.
   */
  async _saveLiftAdvertisement() {
    try {
      await fetch(BackendURL + '/lifts/new', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lift: LiftStore.lift
        }),
      });
    } catch (error) {
      Alert.alert("Leider konnte Ihre Mitfahrgelegenheit nicht gespeichert werden.");
    }
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <ScrollView style={styles.container}>
        <Card
          title="Wollen Sie folgende Mitfahrgelegenheit inserieren?"
          containerStyle={styles.cardContainer}
          titleStyle={styles.cardTitle}
        >
          <Text style={styles.cardText}>Start: {LiftStore.lift.start.cityName}</Text>
          <Text style={styles.cardText}>Ziel: {LiftStore.lift.target.cityName}</Text>
          <Text style={styles.cardText}>Mitfahrer: {LiftStore.lift.passengers}</Text>
          <Text style={styles.cardText}>Datum: {`${LiftStore.lift.datetime.day}.${LiftStore.lift.datetime.month}.${LiftStore.lift.datetime.year}`}</Text>
          <Text style={styles.cardText}>Uhrzeit: {`${LiftStore.lift.datetime.hour}:${LiftStore.lift.datetime.minutes} Uhr`}</Text>
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
      </ScrollView>
    );
  }
};

/** Style Object of the OverviewAdScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1
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