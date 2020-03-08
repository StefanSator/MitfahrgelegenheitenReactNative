import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Slider, Icon, Button } from 'react-native-elements';
import StepProgressBar from '../views/StepProgressBar';
import InfoButton from '../views/InfoButton';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

/**
 * Class implementing the CompanionScreen Component.
 * @extends React.Component
 */
class CompanionScreen extends React.Component {

  static navigationOptions = {
    title: 'Mitfahrer'
  }

  /**
   * Create a new CompanionScreen Component.
   */
  constructor() {
    super();
    /** Local State Object of the Component. */
    this.state = {
      progressIsVisible: false
    };
  }

  /**
   * Action which is called when the next button is clicked. Switches to next Component
   * in the Advertising Process.
   */
  _buttonPressed() {
    this.props.navigation.navigate('Date');
  }

  /**
   * Opens Overlay with Progress Information.
   */
  _showProgressOverlay() {
    this.setState({ progressIsVisible: true });
  }

  /**
   * Closes Overlay with Progress Information.
   */
  _closeProgressOverlay() {
    this.setState({ progressIsVisible: false });
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <View style={styles.container}>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Wie viele möchtest du mitnehmen?</Text>
        <View style={styles.slider}>
          <Slider
            value={LiftStore.lift.passengers}
            onValueChange={value => LiftStore.setPassengers(value)}
            minimumValue={1}
            maximumValue={6}
            step={1}
          />
          <Text h2 style={styles.sliderText}>{LiftStore.lift.passengers}</Text>
        </View>
        <Button
          buttonStyle={styles.checkButton}
          icon={
            <Icon
              name='check-circle'
              type='ant-design'
              color='white'
              size={50}
            />
          }
          onPress={this._buttonPressed.bind(this)}
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
          currentStep={1}
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    );
  }
};

/** Style Object of the CompanionScreen Component. */
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
  slider: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  sliderText: {
    alignSelf: 'center',
    color: 'black',
    marginTop: 20
  },
  checkButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50
  },
  infobutton: {
    alignSelf: 'flex-end',
    top: 0,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default observer(CompanionScreen);