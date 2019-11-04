import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Slider, Icon, Button } from 'react-native-elements';

class CompanionScreen extends React.Component {

  static navigationOptions = {
    title: 'Mitfahrer'
  }

  constructor() {
    super();
    this.destination = '';
    this.state = {
      value: 1
    };
  }

  render() {
    const { navigation } = this.props;
    this.destination = navigation.getParam('destination', this.destination);

    return (
      <View style={styles.container}>
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
          onPress={() => this.props.navigation.navigate('Date', {
            destination: this.destination,
            companions: this.state.value
          })}
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