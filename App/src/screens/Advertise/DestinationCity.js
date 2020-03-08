import React from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import Lift from '../../entities/Lift';
import City from '../../entities/City';
import StepProgressBar from '../views/StepProgressBar';
import InfoButton from '../views/InfoButton';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

/**
 * Class implementing the DestinationCityScreen Component.
 * @extends React.Component
 */
class DestinationCityScreen extends React.Component {

  static navigationOptions = {
    title: 'Zielstadt',
  };

  /**
   * Create a new DestinationCityScreen Component.
   * @param {Object} props properties which are passed to the component.
   */
  constructor(props) {
    super(props);
    // Set State Object
    /** Local State Object of the Component. */
    this.state = {
      listdata: [],
      progressIsVisible: false
    };
    const { navigation } = props;
    /** The Destination State which was passed from the previous Component in the Advertise Process. */
    this.destinationState = navigation.getParam('destinationState', '');
    // Load List Data
    this._loadCityData(this.destinationState);
  }

  /**
   * Starts GET-Request to Backend to retrieve all cities for the specified destination state.
   * @param {String} destinationState The State for which the cities should be retrieved.
   */
  async _loadCityData(destinationState) {
    try {
      const encodedDestinationState = encodeURIComponent(destinationState);
      let response = await fetch(BackendURL + '/lifts/destination/cities?state=' + encodedDestinationState);
      const result = await response.json();
      this.setState({ listdata: result, progressIsVisible: this.state.progressIsVisible });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /**
   * Is called when the user selects a item (City) in the list.
   * @param {City} item The City the user has selected.
   */
  _itemSelected(item) {
    let targetCity = new City(item.cityid, item.city, item.state, item.latitude, item.longitude);
    LiftStore.setDestination(targetCity);
    this.props.navigation.navigate('Companion');
  }

  /**
   *  Opens Overlay with Progress Information 
   */
  _showProgressOverlay() {
    this.setState({ listdata: this.state.listdata, progressIsVisible: true });
  }

  /**
   *  Closes Overlay with Progress Information
   */
  _closeProgressOverlay() {
    this.setState({ listdata: this.state.listdata, progressIsVisible: false });
  }

  /* Used to extract a unique key for a given item at the specified index. */
  keyExtractor = (item, index) => index.toString()

  /* Is called to render a selected item of the List containing the cities. */
  renderItem = ({ item }) => (
    <ListItem
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      title={item.city}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      containerStyle={styles.listitem}
      chevron={{ color: 'white' }}
      onPress={() => { this._itemSelected(item) }}
    />
  )

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <View style={styles.container}>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Wohin fährst du?</Text>
        <FlatList style={styles.list}
          keyExtractor={this.keyExtractor}
          data={this.state.listdata}
          renderItem={this.renderItem}
        />
        <StepProgressBar
          steps={
            [
              {
                label: 'Ziel'
              },
              {
                label: 'Mitfahrer'
              },
              {
                label: 'Termin'
              },
              {
                label: 'Preis'
              },
              {
                label: 'Event'
              }
            ]
          }
          currentStep={0}
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    )
  }
};

/** Style Object of the DestinationCityScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 50,
    marginBottom: 10
  },
  list: {
    marginBottom: 35,
    marginRight: 20,
    marginLeft: 20
  },
  listitem: {
    backgroundColor: '#1089ff',
    marginBottom: 10,
    borderRadius: 10
  },
  infobutton: {
    alignSelf: 'flex-end',
    top: 0,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default observer(DestinationCityScreen);