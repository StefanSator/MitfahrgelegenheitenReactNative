import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import StepProgressBar from '../views/StepProgressBar';
import InfoButton from '../views/InfoButton';
import LiftStore from '../../stores/LiftStore';
import Datetime from '../../entities/Datetime';
import { observer } from 'mobx-react';

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
    LiftStore.setDatetime(new Datetime(datetime.getDate(), datetime.getMonth() + 1, datetime.getFullYear(), datetime.getHours(), datetime.getUTCMinutes()));
    this.props.navigation.navigate('PriceRecommendation');
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
    console.log(LiftStore.lift);

    return (
      <View style={styles.container}>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Wann wollt ihr fahren?</Text>
        <Button buttonStyle={styles.checkButton}
          title= {LiftStore.lift.datetime === null ? "Termin wählen" : `${LiftStore.lift.datetime.day}.${LiftStore.lift.datetime.month}.${LiftStore.lift.datetime.year}`}
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
                currentStep: true
              },
              {
                label: 'Preis',
                notcompleted: (LiftStore.lift.price) ? false : true,
                currentStep: false
              },
              {
                label: 'Event',
                notcompleted: (LiftStore.lift.event) ? false : true,
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
    backgroundColor: "white"
  },
  title: {
    color: 'black',
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

export default observer(DateScreen);