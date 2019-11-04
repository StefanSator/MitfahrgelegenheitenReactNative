import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Button, Icon } from 'react-native-elements';

class OverviewAdScreen extends React.Component {

  static navigationOptions = {
    title: 'Überblick'
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  _acceptButtonPressed() {
    // TODO: Save Advertise in Database
  }

  _refuseButtonPressed() {
    this.props.navigation.navigate('Advertise');
  }

  render() {
    const { navigation } = this.props;
    this.destination = navigation.getParam('destination', '');
    this.companions = navigation.getParam('companions', 0);
    this.datetime = navigation.getParam('datetime', new Date());
    this.price = navigation.getParam('price', 0);

    return (
      <View style={styles.container}>
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={this.state.isVisible}
          borderRadius={10}
          width='auto'
          height='auto'>
          <Text h2 style={styles.title}>Überblick</Text>
          <Text h4 style={styles.text}>Ziel: {this.destination}</Text>
          <Text h4 style={styles.text}>Mitfahrer: {this.companions}</Text>
          <Text h4 style={styles.text}>Datum: {'' + this.datetime}</Text>
          <Text h4 style={styles.text}>Preis: {'' + this.price + '€'}</Text>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.acceptButton}
              titleStyle={styles.buttonTitle}
              title="Einverstanden"
              icon={
                <Icon
                  name='check'
                  type='feather'
                  color='white'
                />
              }
              onPress={this._acceptButtonPressed.bind(this)}
            />
            <Button
              buttonStyle={styles.refuseButton}
              titleStyle={styles.buttonTitle}
              title="Abbrechen"
              icon={
                <Icon
                  name='cross'
                  type='entypo'
                  color='white'
                />
              }
              onPress={this._refuseButtonPressed.bind(this)}
            />
          </View>
        </Overlay>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20639B"
  },
  overlay: {
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  title: {
    color: '#20639B',
    marginBottom: 20,
    alignSelf: 'center'
  },
  text: {
    marginBottom: 10,
    marginTop: 10
  },
  acceptButton: {
    backgroundColor: "#20639B",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  refuseButton: {
    backgroundColor: "red",
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 32,
    borderRadius: 10
  },
  buttonTitle: {
    color: 'white',
    paddingLeft: 17
  },
  buttonContainer: {
    alignSelf: 'center'
  }
});

export default OverviewAdScreen;