import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import InfoButton from '../views/InfoButton';
import StepProgressBar from '../views/StepProgressBar';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

class PriceScreen extends React.Component {

  static navigationOptions = {
    title: 'Preis'
  };

  constructor(props) {
    super(props);
    this.state = {
      progressIsVisible: false
    };
  }

  _checkButtonPressed() {
    this.props.navigation.navigate('EventType');
  }

  /* Updates the Value, to display on GUI */
  _updateValue(value) {
    LiftStore.lift.price = value;
  }

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    this.setState({ progressIsVisible: true });
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    this.setState({ progressIsVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Wie viel wollt ihr dafür?</Text>
        <NumericInput
          value={LiftStore.lift.price}
          onChange={value => this._updateValue(value)}
          minValue={0}
          totalWidth={300}
          totalHeight={100}
          iconSize={25}
          step={5}
          valueType='real'
          rounded
          textColor='#1089ff'
          iconStyle={{ color: 'white' }}
          containerStyle={styles.numericInputContainer}
          rightButtonBackgroundColor='#1089ff'
          leftButtonBackgroundColor='#1089ff' />
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
          currentStep={3}
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
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
    backgroundColor: '#1089ff',
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50
  },
  numericInputContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  infobutton: {
    alignSelf: 'flex-end',
    top: 0,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default observer(PriceScreen);