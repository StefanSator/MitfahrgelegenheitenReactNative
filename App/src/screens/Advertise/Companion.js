import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

class CompanionScreen extends React.Component {

  constructor() {
    super();
    this.search = '';
  }

  render() {
    const { navigation } = this.props;
    this.search = navigation.getParam('search', this.search);

    return (
      <View style={styles.container}>
        <Text>{this.search}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20639B"
  }
});

export default CompanionScreen;