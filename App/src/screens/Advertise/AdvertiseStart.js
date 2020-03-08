import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import LiftStore from '../../stores/LiftStore';
/* Photo by Simon Maage on Unsplash */
const image = require('../../assets/images/friends.jpeg');

/**
 * Class implementing the AdvertiseStartScreen Component.
 * @extends React.Component
 */
class AdvertiseStartScreen extends React.Component {

  static navigationOptions = {
    title: 'Inserieren'
  };

  /**
   * Start a new Advertising Process by resetting the global State Object
   * and switching to the next Component in the Process.
   */
  _advertiseButtonClicked() {
    // Create new Lift Object in MobX Store
    LiftStore.newLift();
    // Navigate to next screen
    this.props.navigation.navigate('DestinationState');
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <ImageBackground source={image} style={{ width: '100%', height: '100%' }} blurRadius={10}>
        <View style={styles.container}>
          <Card
            title='INSERIEREN'
            image={image}>
            <Text style={{ marginBottom: 10 }}>
              Du planst demnächst auf ein Event zu fahren und möchtest Kommilitonen mitnehmen?
              Dann inseriere jetzt eine Mitfahrgelegenheit. Natürlich kannst duch auch private Fahrten
              hier inserieren.
          </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='LOS GEHTS!'
              onPress={this._advertiseButtonClicked.bind(this)}
            />
          </Card>
        </View>
      </ImageBackground>
    )
  }

};

/** Style Object of the AdvertiseStartScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default AdvertiseStartScreen;