import React from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import StepProgressBar from '../views/StepProgressBar';
import InfoButton from '../views/InfoButton';

class DestinationStateScreen extends React.Component {

  static navigationOptions = {
    title: 'Zielbundesland',
  };

  constructor(props) {
    super(props);
    // Set State Object
    this.state = {
      listdata: [],
      progressIsVisible: false
    };
    // Load List Data
    this._loadStates();
  }

  /* Get all available States to display as data of a list from Backend */
  async _loadStates() {
    try {
      let response = await fetch(BackendURL + '/lifts/destination/states');
      const result = await response.json();
      this.setState({ listdata: result, progressIsVisible: this.state.progressIsVisible });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    this.setState({ listdata: this.state.listdata, progressIsVisible: true });
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    this.setState({ listdata: this.state.listdata, progressIsVisible: false });
  }

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
      containerStyle={styles.listitem}
      /* linearGradientProps={{
        //colors: ['#64c4ed', '#4f81c7'],
        colors: ['#ffe8d6', '#ff971d'],
        start: { x: 1, y: 0 },
        end: { x: 0.5, y: 0 },
      }}
      ViewComponent={LinearGradient} */
      title={item.state}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
      chevron={{ color: 'white' }}
      onPress={() => { this._itemSelected(item) }}
    />
  )

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
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    //backgroundColor: "#20639B"
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

export default DestinationStateScreen;