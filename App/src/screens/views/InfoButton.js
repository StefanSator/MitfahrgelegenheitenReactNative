import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class InfoButton extends React.Component {
  
  render() {
    let containerStyle = this.props.containerStyle;
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
            color: "white"
          }}
          onPress={() => this.buttonAction()}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30
  }
});

export default InfoButton;