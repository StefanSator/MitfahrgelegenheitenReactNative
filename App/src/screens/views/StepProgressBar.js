import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, Overlay, Icon } from 'react-native-elements';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

/**
 * Class implementing the StepProgressBar Component.
 * @extends React.Component
 */
class StepProgressBar extends React.Component {

  /**
   * Create a new StepProgressBar Component.
   * @param {Object} props properties which are passed to the component.
   */
  constructor(props) {
    super(props);
    /** Array of Steps, containing the label of the steps. */
    this.steps = this.props.steps;
    /** Current Step in the Progress Bar. */
    this.currentStep = this.props.currentStep;
    /** True, if Progress Bar is visible on screen, else false. */
    this.isVisible = this.props.isVisible;
    /** Callback-Function which tells parent component if Close Button has been clicked. */
    this.callback = this.props.closeCallback;
  }

  /** Calls Callback-Function of Parent Component, to tell Parent that the user wants to close the Progress Bar. */
  _closeOverlay() {
    this.callback();
  }

  /**
   * Displays an Dialog containing Information about a selected Step in the Progress Bar.
   * @param {Integer} index 
   */
  _informationHandler(index) {
    switch (index) {
      case 0: Alert.alert(LiftStore.lift.target ? 'Ziel: ' + LiftStore.lift.target.cityName : 'Nichts angegeben!'); break;
      case 1: Alert.alert(LiftStore.lift.passengers ? 'Mitfahrer: ' + LiftStore.lift.passengers : 'Nichts angegeben!'); break;
      case 2: Alert.alert(LiftStore.lift.datetime ? `Datum: ${LiftStore.lift.datetime.day}.${LiftStore.lift.datetime.month}.${LiftStore.lift.datetime.year}\n`
        + `Uhrzeit: ${LiftStore.lift.datetime.hour}:${LiftStore.lift.datetime.minutes} Uhr` : 'Nichts angegeben!'); break;
      case 3: Alert.alert(LiftStore.lift.price ? 'Preis: ' + LiftStore.lift.price + '€' : '0€'); break;
      case 4: Alert.alert(LiftStore.lift.event.eventTitle.length != 0 ? LiftStore.lift.event.eventTitle : 'Nichts angegeben!'); break;
    }
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    this.steps = this.props.steps;
    this.isVisible = this.props.isVisible;
    this.currentStep = this.props.currentStep;
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
              if (index === this.currentStep) {
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
                    disabled={index > this.currentStep ? true : false}
                    buttonStyle={{ ...styles.button, backgroundColor: bgColor }}
                    iconContainerStyle={styles.iconContainer}
                    icon={(index === this.currentStep) ? currentIcon : (index > this.currentStep ? inaccomplishedIcon : accomplishedIcon)}
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

/** Style Object for the StepProgressBar Component. */
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