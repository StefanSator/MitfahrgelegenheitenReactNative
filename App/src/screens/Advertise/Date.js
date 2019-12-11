import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import StepProgressBar from '../views/StepProgressBar';
import InfoButton from '../views/InfoButton';

class DateScreen extends React.Component {

  static navigationOptions = {
    title: 'Termin'
  }

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      progressIsVisible: false
    };
  }

  _showDateTimePicker() {
    this.setState({ isDateTimePickerVisible: true, progressIsVisible: this.state.progressIsVisible });
  };

  _hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false, progressIsVisible: this.state.progressIsVisible });
  };

  _handleDatePicked(datetime) {
    this._hideDateTimePicker();
    this.lift.datetime = datetime;
    this.props.navigation.navigate('PriceRecommendation', {
      lift: this.lift
    });
  };

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    this.setState({ isDateTimePickerVisible: this.state.isDateTimePickerVisible, progressIsVisible: true });
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    this.setState({ isDateTimePickerVisible: this.state.isDateTimePickerVisible, progressIsVisible: false });
  }

  render() {
    const { navigation } = this.props;
    this.lift = navigation.getParam('lift', null);
    console.log(this.lift);

    return (
      <View style={styles.container}>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Wann wollt ihr fahren?</Text>
        <Button buttonStyle={styles.checkButton}
          title="Termin wählen"
          onPress={this._showDateTimePicker.bind(this)} />
        <DateTimePicker
          mode={'datetime'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked.bind(this)}
          onCancel={this._hideDateTimePicker.bind(this)}
        />
        <StepProgressBar
          steps={
            [
              {
                label: 'Ziel',
                notcompleted: false,
                currentStep: false
              },
              {
                label: 'Mitfahrer',
                notcompleted: false,
                currentStep: false
              },
              {
                label: 'Termin',
                notcompleted: false,
                currentStep: true
              },
              {
                label: 'Preis',
                notcompleted: true,
                currentStep: false
              },
              {
                label: 'Event',
                notcompleted: true,
                currentStep: false
              }
            ]
          }
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20639B"
  },
  title: {
    color: 'white',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50
  },
  checkButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50,
  },
  infobutton: {
    alignSelf: 'flex-end',
    top: 0,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default DateScreen;