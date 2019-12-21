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
      title: '',
      descriptionChars: 0,
      description: '',
      progressIsVisible: false
    }
  }

  /* Increments the State Variable titleChars, when text input changes */
  _incrementTitleCharCount(title) {
    this.setState({
      titleChars: title.length,
      title: title,
      descriptionChars: this.state.descriptionChars,
      description: this.state.description,
      progressIsVisible: this.state.progressIsVisible
    });
  }

  /* Increments the State Variable descriptionChars, when text input changes */
  _incrementDescriptionCharCount(description) {
    this.setState({
      titleChars: this.state.titleChars,
      title: this.state.title,
      descriptionChars: description.length,
      description: description,
      progressIsVisible: this.state.progressIsVisible
    });
  }

  /* Navigate to next screen of App */
  _nextButtonPressed() {
    if (this.state.title.length === 0) {
      Alert.alert('Bitte geben Sie den Namen des Events ein.');
      return;
    } else if (this.state.description.length === 0) {
      Alert.alert('Bitte geben Sie eine kurze Beschreibung für das Event ein.');
      return;
    } else {
      this.props.navigation.navigate('Faculty', {
        eventTitle: this.state.title,
        eventDescription: this.state.description
      });
    }
  }

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    let copy = JSON.parse(JSON.stringify(this.state));
    copy.progressIsVisible = true;
    console.log(copy);
    this.setState(copy);
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    let copy = JSON.parse(JSON.stringify(this.state));
    copy.progressIsVisible = false;
    this.setState(copy);
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
          onChangeText={this._incrementTitleCharCount.bind(this)}
          placeholder='Karrieremesse München, Hackathon Berlin etc.'
          multiline={true}
          maxLength={50}
          inputStyle={{ height: 50, textAlignVertical: 'top', borderWidth: 1, fontSize: 14, padding: 10 }} />
        <Text style={styles.maxCharText}>{this.state.titleChars} / 50</Text>
        <Text h4 style={styles.title}>Um was handelt es sich?</Text>
        <Input
          onChangeText={this._incrementDescriptionCharCount.bind(this)}
          placeholder='Suche Leute die bei mir mitfahren wollen, um zusammen die Karrieremesse in München zu besuchen.'
          multiline={true}
          maxLength={200}
          inputStyle={{ height: 150, textAlignVertical: 'top', borderWidth: 1, fontSize: 14, padding: 10 }} />
        <Text style={styles.maxCharText}>{this.state.descriptionChars} / 200</Text>
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
                label: 'Ziel',
                notcompleted: (LiftStore.lift.target) ? false : true,
                currentStep: false
              },
              {
                label: 'Mitfahrer',
                notcompleted: (LiftStore.lift.passengers) ? false : true,
                currentStep: false
              },
              {
                label: 'Termin',
                notcompleted: (LiftStore.lift.datetime) ? false : true,
                currentStep: false
              },
              {
                label: 'Preis',
                notcompleted: (LiftStore.lift.price) ? false : true,
                currentStep: false
              },
              {
                label: 'Event',
                notcompleted: (LiftStore.lift.event) ? false : true,
                currentStep: true
              }
            ]
          }
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