import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, Button} from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

class PriceScreen extends React.Component {

  static navigationOptions = {
    title: 'Preis'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isVisible: true
    };
  }

  _checkButtonPressed() {
    this.lift.price = this.state.value;
    this.props.navigation.navigate('Event', {
      lift: this.lift
    });
  }

  render() {
    const { navigation } = this.props;
    this.lift = navigation.getParam('lift', null);

    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>Wie viel wollt ihr dafür?</Text>
        <NumericInput
          value={this.state.value}
          onChange={value => this.setState({ value: value, isVisible: this.state.isVisible })}
          minValue={0}
          totalWidth={300}
          totalHeight={100}
          iconSize={25}
          step={5}
          valueType='real'
          rounded
          textColor='white'
          iconStyle={{ color: '#20639B' }}
          containerStyle={styles.numericInputContainer}
          rightButtonBackgroundColor='white'
          leftButtonBackgroundColor='white' />
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
          onPress={this._checkButtonPressed.bind(this)}
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
    marginLeft: 20,
    marginBottom: 10
  },
  priceInput: {
    marginLeft: 10,
    color: 'white'
  },
  priceContainer: {
    paddingRight: 50
  },
  checkButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50
  },
  numericInputContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  }
});

export default PriceScreen;