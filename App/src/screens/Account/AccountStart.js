import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { ButtonGroup, Card, Text, Avatar, Button } from 'react-native-elements';
import SessionStore from '../../stores/SessionStore';

/**
 * Class implementing the AccounScreen Component.
 * @extends React.Component
 */
class AccountStartScreen extends React.Component {

  static navigationOptions = {
    title: 'Account'
  };

  /**
   * Create a new AccountSceen Component.
   * @param {Object} props properties which are passed to the component.
   */
  constructor(props) {
    super(props);
    /** Local State Object of the Component. */
    this.state = {
      requestinput: [],
      requestoutput: [],
      selectedIndex: 0
    }

    this._updateSelectedIndex = this._updateSelectedIndex.bind(this);
    this._loadRequestInput = this._loadRequestInput.bind(this);
    this._loadRequestOutput = this._loadRequestOutput.bind(this);
    this._inviteUserToLift = this._inviteUserToLift.bind(this);
    this._refuseUserForLift = this._refuseUserForLift.bind(this);
    this._showUserInformationDialog = this._showUserInformationDialog.bind(this);
    this._deleteRequestOutput = this._deleteRequestOutput.bind(this);

    this._loadRequestInput();
    this._loadRequestOutput();
  }

  /**
   * Invite a User to own advertised Lift by sending a POST-Request to the Backend Service.
   * @param {Object} liftRequest 
   */
  async _inviteUserToLift(liftRequest) {
    try {
      let res = await fetch(BackendURL + '/lifts/book/accept', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: liftRequest.userid,
          liftId: liftRequest.liftid
        }),
      });
      let response = await res.json();
      if (response.error !== undefined) {
        Alert.alert("Leider trat beim Abarbeiten Ihrer Anfrage ein Server-Fehler auf.");
        console.log('Error: ' + response.error);
      }
      if (response.rejected === true) {
        Alert.alert(response.rejectionReason);
      } else {
        this._loadRequestInput();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Leider trat beim Abarbeiten Ihrer Anfrage ein Fehler auf.");
    }
  }

  /**
   * Refuse a User to own advertised Lift by sending a POST-Request to the Backend Service.
   * @param {Object} liftRequest 
   */
  async _refuseUserForLift(liftRequest) {
    try {
      await fetch(BackendURL + '/lifts/book/refuse', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: liftRequest.userid,
          liftId: liftRequest.liftid
        }),
      });
      this._loadRequestInput();
    } catch (error) {
      console.log(error);
      Alert.alert("Leider trat beim Abarbeiten Ihrer Anfrage ein Fehler auf.");
    }
  }

  /**
   * Get all Booking-Requests from other users by sending a GET-Request to the backend service.
   */
  async _loadRequestInput() {
    try {
      const encodedUserId = encodeURIComponent(SessionStore.sessionToken);
      let response = await fetch(BackendURL + '/lifts/book/input?userId=' + encodedUserId);
      let liftRequestInput = await response.json();
      console.log(liftRequestInput);
      let copyState = JSON.parse(JSON.stringify(this.state));
      copyState.requestinput = liftRequestInput;
      this.setState(copyState);
      console.log(this.state.requestinput);
    } catch (error) {
      Alert.alert("Leider konnte Ihr Posteingang nicht geladen werden.");
    }
  }

  /**
   * Get my Booking-Requests sent to other users by sending a GET-Request to the backend service.
   */
  async _loadRequestOutput() {
    try {
      const encodedUserId = encodeURIComponent(SessionStore.sessionToken);
      let response = await fetch(BackendURL + '/lifts/book/output?userId=' + encodedUserId);
      let liftRequestOutput = await response.json();
      console.log(liftRequestOutput);
      let copyState = JSON.parse(JSON.stringify(this.state));
      copyState.requestoutput = liftRequestOutput;
      this.setState(copyState);
      console.log(this.state.requestoutput);
    } catch (error) {
      Alert.alert("Leider konnte Ihr Postausgang nicht geladen werden.");
    }
  }

  /**
   * Delete a selected Booking-Request by sending a DELETE-Request to the backend service.
   * @param {Object} liftRequest 
   */
  async _deleteRequestOutput(liftRequest) {
    try {
      await fetch(BackendURL + '/lifts/book', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: SessionStore.sessionToken,
          liftId: liftRequest.liftid
        }),
      });
      this._loadRequestOutput();
    } catch (error) {
      console.log(error);
      Alert.alert("Leider trat beim Abarbeiten Ihrer Anfrage ein Fehler auf.");
    }
  }

  /**
   * Display an Alert showing the Email of a user.
   * @param {String} email 
   */
  _showUserInformationDialog(email) {
    Alert.alert('Email: ' + email);
  }

  /* Used to extract a unique key for a given item at the specified index. */
  keyExtractor = (item, index) => index.toString()

  /* Is called to render a selected item of the Booking-Request Input List. */
  renderItemInput = ({ item }) => (
    <Card
      title={(item.eventid) ? item.eventtitle : `${item.startcity} - ${item.targetcity}`}
      containerStyle={{ backgroundColor: '#1089ff' }}
      titleStyle={{ color: 'white' }}
    >
      <Text style={{ color: 'white' }}>am {item.day}.{item.month}.{item.year} um {item.hour}:{item.minutes} Uhr</Text>
      {
        (item.eventid)
          ?
          <Text style={{ color: 'white' }}>von {item.startcity} nach {item.targetcity}</Text>
          :
          null
      }
      <View style={{ flexDirection: 'row', marginBottom: 10, alignSelf: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', marginTop: 10, marginRight: 20 }}>{item.username}</Text>
        <Avatar
          rounded
          size='medium'
          icon={{ name: 'user', type: 'font-awesome' }}
          activeOpacity={0.7}
          onPress={() => this._showUserInformationDialog(item.email)}
        />
      </View>
      <Button
        title={(item.accepted === false) ? 'Einladen' : 'Ausladen'}
        buttonStyle={{ backgroundColor: (item.accepted === false) ? "#50d890" : "red" }}
        onPress={(item.accepted === false) ? () => this._inviteUserToLift(item) : () => this._refuseUserForLift(item)}
      />
    </Card>
  )

  /* Is called to render a selected item of the Booking-Request Output List. */
  renderItemOutput = ({ item }) => (
    <Card
      title={(item.eventid) ? item.eventtitle : `${item.startcity} - ${item.targetcity}`}
      containerStyle={{ backgroundColor: '#1089ff' }}
      titleStyle={{ color: 'white' }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 20}}>
          <Text style={{ color: 'white' }}>am {item.day}.{item.month}.{item.year} um {item.hour}:{item.minutes} Uhr</Text>
          {
            (item.eventid)
              ?
              <Text style={{ color: 'white' }}>von {item.startcity} nach {item.targetcity}</Text>
              :
              null
          }
          <Text style={{ color: 'white' }}>Preis: {item.price} €</Text>
        </View>
        <Avatar
          rounded
          size='medium'
          icon={{ name: 'user', type: 'font-awesome' }}
          activeOpacity={0.7}
          onPress={() => this._showUserInformationDialog(item.email)}
        />
      </View>
      <Text style={{ fontWeight: 'bold', color: (item.accepted) ? "#50d890" : "white", fontSize: 20, alignSelf: 'center', padding: 10, margin: 10 }}>Status: {(item.accepted) ? 'Eingeladen' : 'Anfrage gesendet'}</Text>
      <Button
        title={'Anfrage löschen'}
        buttonStyle={{ backgroundColor: "red" }}
        onPress={() => this._deleteRequestOutput(item)}
      />
    </Card>
  )

  /**
   * Updates the Sselected Index if the Button in the Top Bar of the screen is pressed.
   * @param {Integer} selectedIndex 
   */
  _updateSelectedIndex(selectedIndex) {
    let valueCopy = JSON.parse(JSON.stringify(this.state));
    valueCopy.selectedIndex = selectedIndex;
    this.setState(valueCopy);
    if (this.state.selectedIndex === 0) {
      this._loadRequestOutput();
    } else {
      this._loadRequestInput();
    }
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    const buttons = ['Posteingang', 'Postausgang']
    const { selectedIndex } = this.state;

    return (
      <View>
        <ButtonGroup
          onPress={this._updateSelectedIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 45 }}
          selectedButtonStyle={{ backgroundColor: '#1089ff' }}
        />
        {
          (this.state.selectedIndex === 0)
            ?
            <FlatList style={{ marginBottom: 35}}
              keyExtractor={this.keyExtractor}
              data={this.state.requestinput}
              renderItem={this.renderItemInput}
            />
            :
            <FlatList style={{ marginBottom: 35}}
              keyExtractor={this.keyExtractor}
              data={this.state.requestoutput}
              renderItem={this.renderItemOutput}
            />
        }
      </View>
    )
  }
};

export default AccountStartScreen;