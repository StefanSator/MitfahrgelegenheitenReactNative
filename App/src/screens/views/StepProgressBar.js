import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class StepProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.steps = this.props.steps; // Array of Step Objects containing label and completed status
    this.accomplishedSteps = this.props.accomplishedSteps;
  }

  render() {
    this.steps = this.props.steps;
    return (
      <View style={styles.outerContainer}>
        <Text style={{ color: '#fff', marginLeft: 10, marginTop: 10, fontSize: 20, textDecorationLine: 'underline'}}>Fortschritt:</Text>
        <View style={styles.innerContainer}>
          {this.steps.map((value, index) => {
            let bgColor;
            if (value.currentStep === true) {
              bgColor = '#fa697c';
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
            return (
              <View style={styles.step} key={index}>
                <Button
                  disabled={value.notcompleted}
                  buttonStyle={{...styles.button, backgroundColor: bgColor}}
                  iconContainerStyle={styles.iconContainer}
                  icon={(value.notcompleted) ? inaccomplishedIcon : accomplishedIcon}
                />
                <Text style={{ color: '#fff', marginTop: 5, alignSelf: 'center' }}>{value.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  outerContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30
  }, 
  iconContainer: {
    paddingTop: 5,
    paddingLeft: 2
  }
});

export default StepProgressBar;