import React from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import { Card, Avatar, Button, Icon, Divider } from 'react-native-elements';
import SessionStore from '../../stores/SessionStore';
import { observer } from 'mobx-react';

class SearchResultScreen extends React.Component {

  static navigationOptions = {
    title: 'Suchergebnisse'
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      searchresult: navigation.getParam('searchresult', null)
    }
    this._showDriverInformation = this._showDriverInformation.bind(this);
    this._sendBookingRequest = this._sendBookingRequest.bind(this);
  }

  async _sendBookingRequest(lift) {
    try {
      await fetch(BackendURL + '/lifts/book', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: SessionStore.sessionToken,
          liftId: lift.liftid
        }),
      });
    } catch (error) {
      Alert.alert("Leider trat beim Abarbeiten Ihrer Suchanfrage ein Fehler auf.");
    }
    Alert.alert('Buchung erstellt.');
  }

  /* Displays Alert with Account Information of Driver */
  _showDriverInformation(lift) {
    Alert.alert('Email: ' + lift.email);
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <Card
      containerStyle={styles.container}
      title={(item.lift.eventid) ? item.lift.eventtitle : `${item.lift.startcity} - ${item.lift.targetcity}`}
      titleStyle={{ color: 'white' }}
    >
      {
        (item.lift.eventid)
          ?
          <View>
            <Text style={styles.cardSubtitles}>Eventbeschreibung:</Text>
            <Text style={{ ...styles.text, marginBottom: 10 }}>{item.lift.eventdescription}</Text>
          </View>
          : null
      }
      <Text style={styles.cardSubtitles}>Fahrer:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Text style={{ ...styles.text, fontSize: 20, alignSelf: 'center', marginRight: 20 }}>{item.lift.username}</Text>
        <Avatar
          rounded
          size='medium'
          icon={{ name: 'user', type: 'font-awesome' }}
          activeOpacity={0.7}
          onPress={() => this._showDriverInformation(item.lift)}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={styles.cardSubtitles}>Start:</Text>
        <Text style={{ ...styles.text, marginBottom: 10, marginRight: 10 }}>{item.lift.startcity}</Text>
        <Text style={styles.cardSubtitles}>Ziel:</Text>
        <Text style={{ ...styles.text, marginBottom: 10 }}>{item.lift.targetcity}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={styles.cardSubtitles}>Anzahl Mitfahrer:</Text>
        <Text style={{ ...styles.text, marginBottom: 10, marginRight: 10 }}>{item.lift.passengers}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={styles.cardSubtitles}>Zeitpunkt:</Text>
        <Text style={{ ...styles.text, marginBottom: 15, marginRight: 10 }}>{`${item.lift.day}.${item.lift.month}.${item.lift.year} ${item.lift.hour}:${item.lift.minutes} Uhr`}</Text>
      </View>
      <Divider style={{ backgroundColor: 'white' }} />
      <View style={{ flexDirection: 'row', margin: 10, alignSelf: 'center' }}>
        <Text style={{ ...styles.cardSubtitles, fontSize: 30 }}>Preis:</Text>
        <Text style={{ ...styles.text, fontSize: 30, marginRight: 10 }}>{item.lift.price} €</Text>
      </View>
      <Button
        icon={<Icon name='book' color='#ffffff' />}
        buttonStyle={{ backgroundColor: "#50d890", borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title=' JETZT BUCHEN'
        onPress={() => this._sendBookingRequest(item.lift)} />
    </Card>
  )

  render() {
    return (
      <View>
        {
          (this.state.searchresult.length !== 0)
            ?
            <FlatList style={styles.list}
              keyExtractor={this.keyExtractor}
              data={this.state.searchresult}
              renderItem={this.renderItem}
            />
            :
            <Text style={{ alignSelf: 'center', fontSize: 30, margin: 30 }}>Wir haben aktuell leider keine passenden Mitfahrgelegenheiten, die mit Ihren aktuellen Suchkriterien übereinstimmen.</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1089ff'
  },
  cardSubtitles: {
    fontWeight: "bold",
    marginRight: 10,
    color: 'white'
  },
  text: {
    color: 'white'
  }
});

export default observer(SearchResultScreen);