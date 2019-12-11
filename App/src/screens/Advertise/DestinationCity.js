import React from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import Lift from '../../entities/Lift';
import City from '../../entities/City';
import StepProgressBar from '../views/StepProgressBar';

class DestinationCityScreen extends React.Component {

  static navigationOptions = {
    title: 'Zielstadt',
  };

  constructor(props) {
    super(props);
    // Set State Object
    this.state = {
      listdata: []
    };
    const { navigation } = props;
    this.destinationState = navigation.getParam('destinationState', '');
    // Load List Data
    this._loadCityData(this.destinationState);
  }

  /* Starts GET-Request to Backend to retrieve city data for the specified destination state */
  async _loadCityData(destinationState) {
    try {
      const encodedDestinationState = encodeURIComponent(destinationState);
      let response = await fetch(BackendURL + '/lifts/destination/cities?state=' + encodedDestinationState);
      const result = await response.json();
      this.setState({ listdata: result });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /* Item from User selected Action Method */
  _itemSelected(item) {
    let lift = new Lift();
    let targetCity = new City(item.cityid, item.city, item.state, item.latitude, item.longitude);
    lift.target = targetCity;
    this.props.navigation.navigate('Companion', {
      lift: lift
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
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient}
      title={item.city}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      containerStyle={styles.listitem}
      chevron={{ color: 'white' }}
      onPress={() => { this._itemSelected(item) }}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <StepProgressBar
          steps={
            [
              {
                label: 'Ziel',
                notcompleted: false,
                currentStep: true
              },
              {
                label: 'Mitfahrer',
                notcompleted: true,
                currentStep: false
              },
              {
                label: 'Termin',
                notcompleted: true,
                currentStep: false
              },
              {
                label: 'Preis',
                notcompleted: true,
                currentStep: false
              },
              {
                label: 'Event',
                notcompleted: true,
                currentStep: false
              }
            ]
          }
        />
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
    marginBottom: 10
  },
  list: {
    marginBottom: 35,
    marginRight: 20,
    marginLeft: 20
  },
  listitem: {
    marginBottom: 10,
    borderRadius: 10
  }
});

export default DestinationCityScreen;