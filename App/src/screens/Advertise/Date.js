import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import StepProgressBar from '../views/StepProgressBar';

class DateScreen extends React.Component {

  static navigationOptions = {
    title: 'Termin'
  }

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  _showDateTimePicker() {
    this.setState({ isDateTimePickerVisible: true });
  };

  _hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  };

  _handleDatePicked(datetime) {
    this._hideDateTimePicker();
    this.lift.datetime = datetime;
    this.props.navigation.navigate('PriceRecommendation', {
      lift: this.lift
    });
  };

  render() {
    const { navigation } = this.props;
    this.lift = navigation.getParam('lift', null);
    console.log(this.lift);

    return (
      <View style={styles.container}>
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
    marginLeft: 20
  },
  checkButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50,
  }
});

export default DateScreen;