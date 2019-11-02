import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, SearchBar, Button, Icon } from 'react-native-elements';

class DestinationScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  _updateSearch(search) {
    this.setState({ search: search });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>Wohin fährst du?</Text>
        <SearchBar
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          placeholder="Type Here..."
          onChangeText={this._updateSearch.bind(this)}
          value={this.state.search}
          lightTheme={true}
        />
        <Button
          buttonStyle={styles.searchButton}
          icon={
            <Icon
              name='check-circle'
              type='ant-design'
              color='white'
              size={50}
            />
          }
          onPress={() => this.props.navigation.navigate('Companion', {
            search: this.state.search
          })}
        />
      </View>
    )
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
  searchContainer: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15
  },
  searchInputContainer: {
    backgroundColor: 'white'
  },
  searchButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50
  }
});

export default DestinationScreen;