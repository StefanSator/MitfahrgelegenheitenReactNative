import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Tooltip, Icon } from 'react-native-elements';
import LiftStore from '../../stores/LiftStore';
import Event from '../../entities/Event';

class EventTypeScreen extends React.Component {

  static navigationOptions = {
    title: 'Event'
  };

  _eventButtonPressed() {
    this.props.navigation.navigate('Event');
  }

  _privateButtonPressed() {
    LiftStore.setEvent(null);
    this.props.navigation.navigate('OverviewAd');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>Handelt es sich um eine Mitfahrgelegenheit zu einem Event oder um eine private Fahrt?</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.buttoninfoGroup}>
            <Button
              containerStyle={styles.typeButtonContainer}
              buttonStyle={{ backgroundColor: '#fe346e'}}
              title="Event"
              onPress={this._eventButtonPressed.bind(this)}
            />
            <Tooltip
              height={150}
              width={200}
              withPointer={true}
              popover={<Text>Ein Event kann jegliche Art von Veranstaltung sein, wie z.B. ein Hackathon oder eine Karrieremesse.</Text>}>
              <Icon
                name='info'
                type='feather'
                color='black'
              />
            </Tooltip>
          </View>
          <View style={styles.buttoninfoGroup}>
            <Button
              containerStyle={styles.typeButtonContainer}
              buttonStyle={{ backgroundColor: '#A640FF' }}
              title="Privat"
              onPress={this._privateButtonPressed.bind(this)}
            />
            <Tooltip
              height={150}
              width={200}
              withPointer={true}
              popover={<Text>Wähle diese Kategorie, wenn deine Mitfahrgelegenheit einen privaten Grund hat, du aber Leute auf deinem Weg mitnehmen könntest.</Text>}>
              <Icon
                name='info'
                type='feather'
                color='black'
              />
            </Tooltip>
          </View>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    top: 0,
    left: 0,
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 25
  },
  buttonGroup: {
    alignSelf: 'center',
    width: 200,
    height: 100
  },
  typeButtonContainer: {
    width: 200,
    height: 100,
    marginBottom: 20,
    marginRight: 10
  },
  buttoninfoGroup: {
    flexDirection: 'row',
  }
});

export default EventTypeScreen;