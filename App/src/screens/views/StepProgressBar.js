import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay, Icon } from 'react-native-elements';

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
        <View style={styles.container}>
          {this.steps.map((value, index) => {
            let bgColor;
            if (value.currentStep === true) {
              //bgColor = '#fa697c';
              bgColor = '#76dbd1'
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
                  disabled={value.notcompleted}
                  buttonStyle={{ ...styles.button, backgroundColor: bgColor }}
                  iconContainerStyle={styles.iconContainer}
                  icon={(value.notcompleted) ? inaccomplishedIcon : (value.currentStep ? currentIcon : accomplishedIcon)}
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

export default StepProgressBar;