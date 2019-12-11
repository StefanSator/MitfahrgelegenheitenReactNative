import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Slider, Icon, Button } from 'react-native-elements';
import StepProgressBar from '../views/StepProgressBar';

class CompanionScreen extends React.Component {

  static navigationOptions = {
    title: 'Mitfahrer'
  }

  constructor() {
    super();
    this.lift = null;
    this.state = {
      value: 1
    };
  }

  _buttonPressed() {
    this.lift.passengers = this.state.value;
    this.props.navigation.navigate('Date', {
      lift: this.lift
    });
  }

  render() {
    const { navigation } = this.props;
    this.lift = navigation.getParam('lift', this.lift);

    return (
      <View style={styles.container}>
        <StepProgressBar
          steps={
            [
              {
                label: 'Ziel',
                notcompleted: false,
                currentStep: true
              },
              {
                label: 'Mitfahrer',
                notcompleted: false,
                currentStep: true
              },
              {
                label: 'Termin',
                notcompleted: true,
                currentStep: false
              },
              {
                label: 'Preis',
                notcompleted: true,
                currentStep: false
              },
              {
                label: 'Event',
                notcompleted: true,
                currentStep: false
              }
            ]
          }
        />
        <Text h4 style={styles.title}>Wie viele möchtest du mitnehmen?</Text>
        <View style={styles.slider}>
          <Slider
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            minimumValue={1}
            maximumValue={6}
            step={1}
          />
          <Text h2 style={styles.sliderText}>{this.state.value}</Text>
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
  slider: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  sliderText: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 20
  },
  checkButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50
  }
});

export default CompanionScreen;