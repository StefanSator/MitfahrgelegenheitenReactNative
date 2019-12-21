import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, Overlay, Icon } from 'react-native-elements';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

class StepProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.steps = this.props.steps; // Array of Step Objects containing label and completed status
    this.isVisible = this.props.isVisible;
    this.callback = this.props.closeCallback;
  }

  _closeOverlay() {
    this.callback();
  }

  _informationHandler(index) {
    switch (index) {
      case 0: Alert.alert(LiftStore.lift.target ? 'Ziel: ' + LiftStore.lift.target.cityName : 'Nichts angegeben!');
      case 1: Alert.alert(LiftStore.lift.passengers ? 'Mitfahrer: ' + LiftStore.lift.passengers : 'Nichts angegeben!');
      case 2: Alert.alert(LiftStore.lift.datetime ? `Datum: ${LiftStore.lift.datetime.day}.${LiftStore.lift.datetime.month}.${LiftStore.lift.datetime.year}\n`
        + `Uhrzeit: ${LiftStore.lift.datetime.hour}:${LiftStore.lift.datetime.minutes} Uhr` : 'Nichts angegeben!');
      case 3: Alert.alert(LiftStore.lift.price ? 'Preis: ' + LiftStore.lift.price + '€' : 'Nichts angegeben!');
      case 4: Alert.alert(LiftStore.lift.event ? LiftStore.lift.event.eventTitle : 'Nichts angegeben!');
    }
  }

  render() {
    this.steps = this.props.steps;
    this.isVisible = this.props.isVisible;
    return (
      <Overlay
        isVisible={this.isVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        width='auto'
        height='auto'
      >
        <View>
          <View style={styles.container}>
            {this.steps.map((value, index) => {
              let bgColor;
              if (value.currentStep === true) {
                bgColor = '#fe346e'
              } else {
                bgColor = '#4d80e4';
              }
              let accomplishedIcon = {
                name: "check",
                type: "antdesign",
                size: 30,
                color: "white"
              };
              let inaccomplishedIcon = {
                name: "cross",
                type: "entypo",
                size: 30,
                color: "white"
              }
              let currentIcon = {
                name: "exclamation",
                type: "antdesign",
                size: 30,
                color: "white"
              }
              return (
                <View style={styles.step} key={index}>
                  <Button
                    disabled={value.currentStep ? !value.notcompleted : value.notcompleted}
                    buttonStyle={{ ...styles.button, backgroundColor: bgColor }}
                    iconContainerStyle={styles.iconContainer}
                    icon={(value.currentStep) ? currentIcon : (value.notcompleted ? inaccomplishedIcon : accomplishedIcon)}
                    onPress={() => this._informationHandler(index)}
                  />
                  <Text style={{ color: 'black', marginTop: 5, alignSelf: 'center' }}>{value.label}</Text>
                </View>
              );
            })}
          </View>
          <Button
            buttonStyle={styles.closeButton}
            titleStyle={styles.buttonTitle}
            title="Schließen"
            icon={
              <Icon
                name='cross'
                type='entypo'
                color='white'
              />
            }
            onPress={() => this._closeOverlay()}
          />
        </View>
      </Overlay>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    padding: 10
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 5
  },
  iconContainer: {
    paddingTop: 5,
    paddingLeft: 2
  },
  closeButton: {
    backgroundColor: "red",
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 32,
    borderRadius: 10
  },
  buttonTitle: {
    color: 'white',
    paddingLeft: 5
  }
});

export default observer(StepProgressBar);