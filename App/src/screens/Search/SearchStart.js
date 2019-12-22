import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
/* Photo by Atlas Green on Unsplash */
const image = require('../../assets/images/hitchhiker.jpeg');

class SearchStartScreen extends React.Component {

  static navigationOptions = {
    title: 'Suchen'
  };

  _navigateToSearchForm() {
    this.props.navigation.navigate('SearchForm');
  }

  render() {
    return (
      <ImageBackground source={image} style={{ width: '100%', height: '100%' }} blurRadius={10}>
        <View style={styles.container}>
          <Card
            title='SUCHEN'
            image={image}>
            <Text style={{ marginBottom: 10 }}>
              Du möchtest gerne demnächst mit Kommilitonen auf ein Event fahren um neue Leute kennen zu lernen
              oder du suchst einfach nur eine private Mitfahrgelegenheit. Dann beginne hier deine Suche.
          </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='LOS GEHTS!'
              onPress={this._navigateToSearchForm.bind(this)}
            />
          </Card>
        </View>
      </ImageBackground>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default SearchStartScreen;