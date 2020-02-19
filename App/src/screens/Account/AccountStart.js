import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { ButtonGroup, Card, Text, Avatar, Button } from 'react-native-elements';
import SessionStore from '../../stores/SessionStore';

class AccountStartScreen extends React.Component {

  static navigationOptions = {
    title: 'Account'
  };

  constructor(props) {
    super(props);
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

  async _loadRequestInput() {
    try {
      const encodedUserId = encodeURIComponent(SessionStore.sessionToken);
      let response = await fetch(BackendURL + '/lifts/book/input?userId=' + encodedUserId);
      let liftRequestInput = await response.json();
      let copyState = JSON.parse(JSON.stringify(this.state));
      copyState.requestinput = liftRequestInput;
      this.setState(copyState);
      console.log(this.state.requestinput);
    } catch (error) {
      Alert.alert("Leider konnte Ihr Posteingang nicht geladen werden.");
    }
  }

  async _loadRequestOutput() {
    try {
      const encodedUserId = encodeURIComponent(SessionStore.sessionToken);
      let response = await fetch(BackendURL + '/lifts/book/output?userId=' + encodedUserId);
      let liftRequestOutput = await response.json();
      let copyState = JSON.parse(JSON.stringify(this.state));
      copyState.requestoutput = liftRequestOutput;
      this.setState(copyState);
      console.log(this.state.requestoutput);
    } catch (error) {
      Alert.alert("Leider konnte Ihr Postausgang nicht geladen werden.");
    }
  }

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

  _showUserInformationDialog(email) {
    Alert.alert('Email: ' + email);
  }

  keyExtractor = (item, index) => index.toString()

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