import React from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import StepProgressBar from '../views/StepProgressBar';
import InfoButton from '../views/InfoButton';
import LiftStore from '../../stores/LiftStore';
import { observer } from 'mobx-react';

/**
 * Class implementing the DestinationStateScreen Component.
 * @extends React.Component
 */
class DestinationStateScreen extends React.Component {

  static navigationOptions = {
    title: 'Zielbundesland',
  };

  /**
   * Create a new DestinationStateScreen Component.
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
    // Load List Data
    this._loadStates();
  }

  /**
   * Get all available States to display as data of a list from the Backend Service.
   */
  async _loadStates() {
    try {
      let response = await fetch(BackendURL + '/lifts/destination/states');
      const result = await response.json();
      this.setState({ listdata: result, progressIsVisible: this.state.progressIsVisible });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

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

  /**
   * Is called when the user selects a item in the displayed list.
   * @param {String} item Name of the State the user has selected. 
   */
  _itemSelected(item) {
    this.props.navigation.navigate('DestinationCity', {
      destinationState: item.state
    });
  }

  /* Used to extract a unique key for a given item at the specified index. */
  keyExtractor = (item, index) => index.toString()

  /* Is called to render a selected item of the displayed List. */
  renderItem = ({ item }) => (
    <ListItem
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      containerStyle={styles.listitem}
      title={item.state}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
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

/** Style Object of the DestinationStateScreen Component. */
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
    marginBottom: 20
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

export default observer(DestinationStateScreen);