import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

/**
 * Class implementing the InfoButton Component.
 * @extends React.Component
 */
class InfoButton extends React.Component {
  
  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    let containerStyle = this.props.containerStyle;
    /** Callback-Function, which gets triggered when InfoButton Component is clicked. */
    this.buttonAction = this.props.buttonAction;
    return (
      <View style={containerStyle}>
        <Button
          type='clear'
          buttonStyle={styles.button}
          icon={{
            name: "info",
            type: "feather",
            size: 30,
            color: "black"
          }}
          onPress={() => this.buttonAction()}
        />
      </View>
    )
  }
};

/** Style Object for the InfoButton Component. */
const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30
  }
});

export default InfoButton;