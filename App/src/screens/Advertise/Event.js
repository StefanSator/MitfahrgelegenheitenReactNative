import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import InfoButton from '../views/InfoButton';
import StepProgressBar from '../views/StepProgressBar';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

class EventScreen extends React.Component {

  static navigationOptions = {
    title: 'Event'
  };

  constructor(props) {
    super(props);
    this.state = {
      titleChars: 0,
      descriptionChars: 0,
      progressIsVisible: false
    }
  }

  /* Increments the State Variable titleChars and updates title, when text input changes */
  _updateEventTitle(title) {
    LiftStore.lift.event.eventTitle = title;
  }

  /* Increments the State Variable descriptionChars and updates description, when text input changes */
  _updateEventDescription(description) {
    LiftStore.lift.event.eventDescription = description;
  }

  /* Navigate to next screen of App */
  _nextButtonPressed() {
    if (LiftStore.lift.event.eventTitle.length === 0) {
      Alert.alert('Bitte geben Sie den Namen des Events ein.');
      return;
    } else if (LiftStore.lift.event.eventDescription.length === 0) {
      Alert.alert('Bitte geben Sie eine kurze Beschreibung für das Event ein.');
      return;
    } else {
      this.props.navigation.navigate('Faculty');
    }
  }

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    this.setState({ progressIsVisible: true });
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    this.setState({ progressIsVisible: false });
  }

  render() {
    return (
      <View>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Wie heißt das Event?</Text>
        <Input
          onChangeText={this._updateEventTitle.bind(this)}
          placeholder='Karrieremesse München, Hackathon Berlin etc.'
          value={LiftStore.lift.event.eventTitle}
          multiline={true}
          maxLength={50}
          inputStyle={{ height: 50, textAlignVertical: 'top', borderWidth: 1, fontSize: 14, padding: 10 }} />
        <Text style={styles.maxCharText}>{LiftStore.lift.event.eventTitle.length} / 50</Text>
        <Text h4 style={styles.title}>Um was handelt es sich?</Text>
        <Input
          onChangeText={this._updateEventDescription.bind(this)}
          placeholder='Suche Leute die bei mir mitfahren wollen, um zusammen die Karrieremesse in München zu besuchen.'
          value={LiftStore.lift.event.eventDescription}
          multiline={true}
          maxLength={200}
          inputStyle={{ height: 150, textAlignVertical: 'top', borderWidth: 1, fontSize: 14, padding: 10 }} />
        <Text style={styles.maxCharText}>{LiftStore.lift.event.eventDescription.length} / 200</Text>
        <Button
          buttonStyle={styles.nextButton}
          containerStyle={styles.nextButton}
          icon={{
            name: "arrowright",
            type: 'antdesign',
            size: 15,
            color: "white"
          }}
          title="Weiter"
          onPress={this._nextButtonPressed.bind(this)}
        />
        <StepProgressBar
          steps={
            [
              {
                label: 'Ziel'
              },
              {
                label: 'Mitfahrer'
              },
              {
                label: 'Termin'
              },
              {
                label: 'Preis'
              },
              {
                label: 'Event'
              }
            ]
          }
          currentStep={4}
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    color: 'black',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 50
  },
  maxCharText: {
    alignSelf: 'flex-end',
    marginRight: 8
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginTop: 10,
    width: 100
  },
  infobutton: {
    alignSelf: 'flex-end',
    top: 0,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default observer(EventScreen);