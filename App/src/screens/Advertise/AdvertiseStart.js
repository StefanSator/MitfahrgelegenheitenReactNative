import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
/* Photo by Simon Maage on Unsplash */
const image = require('../../assets/images/friends.jpeg');

class AdvertiseStartScreen extends React.Component {

  _advertiseButtonClicked() {
    this.props.navigation.navigate('DestinationState');
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          title='INSERIEREN'
          image={image}>
          <Text style={{ marginBottom: 10 }}>
            Du planst demnächst auf ein Event zu fahren und möchtest Kommilitonen mitnehmen?
            Dann inseriere jetzt eine Mitfahrgelegenheit. Natürlich kannst duch auch private Fahrten
            hier inserieren.
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='LOS GEHTS!'
            onPress={this._advertiseButtonClicked.bind(this)}
          />
        </Card>
      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default AdvertiseStartScreen;