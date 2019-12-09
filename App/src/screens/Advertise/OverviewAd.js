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
    this.lift = navigation.getParam('lift', null);

    return (
      <View style={styles.container}>
        <Overlay
          overlayStyle={styles.overlay}
          isVisible={this.state.isVisible}
          borderRadius={10}
          windowBackgroundColor="rgba(255, 255, 255, .5)" //
          width='auto'
          height='auto'>
          <View>
            <View style={styles.textContainer}>
              <Text h2 style={styles.title}>Überblick</Text>
              <Text h4 style={styles.text}>Ziel: {this.lift.target.cityName}</Text>
              <Text h4 style={styles.text}>Mitfahrer: {this.lift.passengers}</Text>
              <Text h4 style={styles.text}>Datum: {`${this.lift.datetime.getDate()}.${this.lift.datetime.getMonth() + 1}.${this.lift.datetime.getFullYear()}`}</Text>
              <Text h4 style={styles.text}>Uhrzeit: {`${this.lift.datetime.getHours()}:${this.lift.datetime.getUTCMinutes()} Uhr`}</Text>
              <Text h4 style={styles.text}>Preis: {'' + this.lift.price + '€'}</Text>
            </View>
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
    justifyContent: "space-between",
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
  textContainer: {
    margin: 50
  },
  buttonContainer: {
    alignSelf: 'center'
  }
});

export default OverviewAdScreen;