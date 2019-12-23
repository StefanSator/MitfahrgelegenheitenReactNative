import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

class SearchResultScreen extends React.Component {

  static navigationOptions = {
    title: 'Suchergebnisse'
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>{JSON.stringify(navigation.getParam('searchresult', ''))}</Text>
      </View>
    )
  }
}

export default SearchResultScreen;