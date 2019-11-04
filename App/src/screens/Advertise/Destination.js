import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, SearchBar, Button, Icon } from 'react-native-elements';

class DestinationScreen extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => {
      //const iconName = `search${focused ? '' : '-outline'}`;
      //return <Ionicons name={iconName} size={25} color={tintColor} />;
      return <Icon name={'search'} type='feather' color={tintColor} />;
    },
  };

  constructor() {
    super();
    this.state = {
      destination: ''
    };
  }

  _updateDestination(destination) {
    this.setState({ destination: destination });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>Wohin fährst du?</Text>
        <SearchBar
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          placeholder="Type Here..."
          onChangeText={this._updateDestination.bind(this)}
          value={this.state.destination}
          lightTheme={true}
        />
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
          onPress={() => this.props.navigation.navigate('Companion', {
            destination: this.state.destination
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
  checkButton: {
    marginTop: 20,
    marginLeft: 75,
    marginRight: 75,
    borderRadius: 50
  }
});

export default DestinationScreen;