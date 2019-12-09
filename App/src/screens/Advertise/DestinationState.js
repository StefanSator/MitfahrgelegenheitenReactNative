import React from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

class DestinationStateScreen extends React.Component {

  static navigationOptions = {
    title: 'Zielbundesland',
  };

  constructor() {
    super();
    // Set State Object
    this.state = {
      listdata: []
    };
    // Load List Data
    this._loadStates();
  }

  /* Get all available States to display as data of a list from Backend */
  async _loadStates() {
    try {
      let response = await fetch(BackendURL + '/lifts/destination/states');
      const result = await response.json();
      this.setState({ listdata: result });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  /* Item from User selected Action Method */
  _itemSelected(item) {
    this.props.navigation.navigate('Destination', {
      destinationState: item.state
    });
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      linearGradientProps={{
        colors: ['#64c4ed', '#4f81c7'],
        start: {x: 1, y: 0},
        end: {x: 0.2, y: 0},
      }}
      ViewComponent={LinearGradient}
      title={item.state}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      chevron={{ color: 'white' }}
      onPress={() => {this._itemSelected(item)}}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.title}>Wohin fährst du?</Text>
        <FlatList style={styles.list}
          keyExtractor={this.keyExtractor}
          data={this.state.listdata}
          renderItem={this.renderItem}
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
    marginBottom: 20
  },
  list: {
    marginBottom: 35,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10
  }
});

export default DestinationStateScreen;