import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";

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
    this.props.navigation.navigate('PriceRecommendation', {
      destination: this.destination,
      companions: this.companions,
      datetime: datetime
    });
  };

  render() {
    const { navigation } = this.props;
    this.destination = navigation.getParam('destination', '');
    this.companions = navigation.getParam('companions', 0);

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