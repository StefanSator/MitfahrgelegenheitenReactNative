import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Text, Button, ButtonGroup, Slider, Tooltip, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SearchRequestStore from '../../stores/SearchRequestStore';
import { observer } from 'mobx-react';
import Datetime from '../../entities/Datetime';

/**
 * Class implementing the SearchFormScreen Component.
 * @extends React.Component
 */
class SearchFormScreen extends React.Component {

  static navigationOptions = {
    title: 'Suche'
  };

  /**
   * Create a new SearchFormScreen Component.
   */
  constructor() {
    super();
    /**
     * Local State Object of the Component.
     */
    this.state = {
      selectedIndex: 0,
      sliderValue: 0,
      isDestinationDropDownVisible: false,
      isDatePickerVisible: false,
      states: [],
      cities: [],
      faculties: [],
      statesAreLoading: true,
      citiesAreLoading: true,
      facultiesAreLoading: true
    }
    this._updateSelectedEventIndex = this._updateSelectedEventIndex.bind(this);
    this._loadStates = this._loadStates.bind(this);
    this._loadCityData = this._loadCityData.bind(this);
    this._destinationStateSelected = this._destinationStateSelected.bind(this);
    this._destinationCitySelected = this._destinationCitySelected.bind(this);
    this._hideDateTimePicker = this._hideDateTimePicker.bind(this);
    this._handleDatePicked = this._handleDatePicked.bind(this);
    this._showDateTimePicker = this._showDateTimePicker.bind(this);
    this._showDestinationDropDown = this._showDestinationDropDown.bind(this);
    this._hideDestinationDropDown = this._hideDestinationDropDown.bind(this);
    this._searchRadiusSelected = this._searchRadiusSelected.bind(this);
    this._selectFacultiesButtonPressed = this._selectFacultiesButtonPressed.bind(this);
    this._searchButtonPressed = this._searchButtonPressed.bind(this);
    this._sendSearchRequest = this._sendSearchRequest.bind(this);
    this._checkFormInput = this._checkFormInput.bind(this);

    this._loadStates();
  }

  /**
   * Action which gets triggered when the user clicks the Search Button of the App.
   */
  _searchButtonPressed() {
    //console.log(SearchRequestStore.search);
    // Check before sending if required values are non null
    let check = this._checkFormInput();
    if (check !== false) {
      this._sendSearchRequest();
    }
  }

  /**
   * Send SearchRequest to Backend and get a List of Lifts fitting the Search Request send to the backend service.
   */
  async _sendSearchRequest() {
    try {
      let response = await fetch(BackendURL + '/lifts/search', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchrequest: SearchRequestStore.search
        }),
      });
      let searchresponse = await response.json();
      console.log(searchresponse);
      this.props.navigation.navigate('SearchResult', {
        searchresult: searchresponse
      });
    } catch (error) {
      Alert.alert("Leider trat beim Abarbeiten Ihrer Suchanfrage ein Fehler auf.");
    }
  }

  /**
   * Checks if all required fields in the Search Formular are not null and valid.
   */
  _checkFormInput() {
    if (SearchRequestStore.search.place === null) {
      Alert.alert('Bitte gebe deinen gewünschten Ort ein.');
      return false;
    } else if (SearchRequestStore.search.datetime === null) {
      Alert.alert('Bitte gebe deinen gewünschten Abfahrtszeitpunkt ein.');
      return false;
    }
    return true;
  }

  /**
   * Switch to FacultyFilterScreen Component, for Faculty Filter of Events in Search Request
   */
  _selectFacultiesButtonPressed() {
    this.props.navigation.navigate('FacultyFilter');
  }

  /**
   * Show Destination Drop Down Menu, for Destination Place selection.
   */
  _showDestinationDropDown() {
    let valueCopy = JSON.parse(JSON.stringify(this.state));
    valueCopy.isDestinationDropDownVisible = true;
    this.setState(valueCopy);
  }

  /**
   * Hide Destination Drop Down Menu.
   */
  _hideDestinationDropDown() {
    let valueCopy = JSON.parse(JSON.stringify(this.state));
    valueCopy.isDestinationDropDownVisible = false;
    this.setState(valueCopy);
  }

  /**
   * Show Datetime Picker, for Date Selection.
   */
  _showDateTimePicker() {
    let valueCopy = JSON.parse(JSON.stringify(this.state));
    valueCopy.isDatePickerVisible = true;
    this.setState(valueCopy);
  };

  /**
   * Hide Datetime Picker.
   */
  _hideDateTimePicker() {
    let valueCopy = JSON.parse(JSON.stringify(this.state));
    valueCopy.isDatePickerVisible = false;
    this.setState(valueCopy);
  };

  /**
   * Sets the Date of the global State Object, after the user has selected a Date with the DatePicker.
   * @param {Date} datetime Date on which the user wants to search for suitable Lifts.
   */
  _handleDatePicked(datetime) {
    this._hideDateTimePicker();
    SearchRequestStore.setDatetime(new Datetime(datetime.getDate(), datetime.getMonth() + 1, datetime.getFullYear(), datetime.getHours(), datetime.getUTCMinutes()));
  };

  /**
   * Action which gets triggered if a user selects another button in the button group.
   * @param {Integer} selectedIndex Index selected in the Button Group.
   */
  _updateSelectedEventIndex(selectedIndex) {
    let valueCopy = JSON.parse(JSON.stringify(this.state));
    valueCopy.selectedIndex = selectedIndex;
    this.setState(valueCopy);
    switch (selectedIndex) {
      case 0: SearchRequestStore.search.isEventSearch = false; break;
      case 1: SearchRequestStore.search.isEventSearch = true; break;
    }
  }

  /**
   * Calls the loadCityData() function, after the user has selected the Destination State.
   * @param {String} destinationState Selected Destination State.
   */
  _destinationStateSelected(destinationState) {
    this._loadCityData(destinationState);
  }

  /**
   * Sets the Destination Place of the global State Object, after the user has selected a Place in the Search Form.
   * @param {Integer} index Selected Index in the DropDown List.
   * @param {City[]} cities All Cities displayed in the DropDown List.
   */
  _destinationCitySelected(index, cities) {
    SearchRequestStore.setPlace(cities[index]);
    this._hideDestinationDropDown();
  }

  /**
   * Sets the Search Radius of the global State Object, after the user has selected the Search Radius.
   * @param {Integer} radius Selected Search Radius.
   */
  _searchRadiusSelected(radius) {
    SearchRequestStore.setRadius(radius);
  }

  /**
   * Get all available States to display as data of the Drop Down List, by sending a GET-Request to the Backend.
   */
  async _loadStates() {
    try {
      let response = await fetch(BackendURL + '/lifts/destination/states');
      const result = await response.json();
      let valueCopy = JSON.parse(JSON.stringify(this.state));
      valueCopy.states = result;
      valueCopy.statesAreLoading = false;
      this.setState(valueCopy);
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  /**
   * Sends GET-Request to the Backend, to retrieve city data for the specified destination state.
   * @param {String} destinationState Selected Destination State.
   */
  async _loadCityData(destinationState) {
    try {
      const encodedDestinationState = encodeURIComponent(destinationState);
      let response = await fetch(BackendURL + '/lifts/destination/cities?state=' + encodedDestinationState);
      const result = await response.json();
      let valueCopy = JSON.parse(JSON.stringify(this.state));
      valueCopy.cities = result;
      valueCopy.citiesAreLoading = false;
      this.setState(valueCopy);
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    const buttons = ['Private Fahrt', 'Event']
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Ort</Text>
          <Tooltip
            height={60}
            width={200}
            withPointer={true}
            popover={<Text>Wähle den Ort deiner geplanten Reise aus.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        {
          (this.state.isDestinationDropDownVisible === false)
            ?
            <Button
              containerStyle={styles.buttoncontainer}
              buttonStyle={styles.button}
              icon={{
                name: "location-pin",
                type: "entypo",
                size: 18,
                color: "white"
              }}
              title={(SearchRequestStore.search.place) ? SearchRequestStore.search.place.city : 'Stadt wählen...'}
              onPress={this._showDestinationDropDown}
            />
            :
            null
        }
        {
          (this.state.statesAreLoading === false && this.state.isDestinationDropDownVisible === true)
            ?
            <Dropdown
              containerStyle={{ marginRight: 30, marginLeft: 30 }}
              dropdownOffset={{ top: 15, left: 0 }}
              label='Bundesland wählen...'
              data={this.state.states}
              valueExtractor={(value) => value.state}
              onChangeText={(value, index, data) => this._destinationStateSelected(value)}
            />
            :
            null
        }
        {
          (this.state.citiesAreLoading === false && this.state.isDestinationDropDownVisible === true)
            ?
            <Dropdown
              containerStyle={{ marginRight: 30, marginLeft: 30 }}
              dropdownOffset={{ top: 30, left: 0 }}
              label='Stadt wählen...'
              data={this.state.cities}
              valueExtractor={(value) => value.city}
              onChangeText={(value, index, data) => this._destinationCitySelected(index, data)}
            />
            :
            null
        }
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Termin</Text>
          <Tooltip
            height={60}
            width={200}
            withPointer={true}
            popover={<Text>Wähle den Termin für deine geplante Reise aus.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <Button
          containerStyle={styles.buttoncontainer}
          buttonStyle={styles.button}
          icon={{
            name: "calendar",
            type: "entypo",
            size: 18,
            color: "white"
          }}
          title={
            (SearchRequestStore.search.datetime)
              ?
              `${SearchRequestStore.search.datetime.day}.${SearchRequestStore.search.datetime.month}.${SearchRequestStore.search.datetime.year}`
              :
              "Datum wählen..."
          }
          onPress={this._showDateTimePicker}
        />
        <DateTimePicker
          mode='date'
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Art</Text>
          <Tooltip
            height={80}
            width={200}
            withPointer={true}
            popover={<Text>Planst du eine private Fahrt oder möchtest du auf ein Event fahren.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <ButtonGroup
          onPress={this._updateSelectedEventIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 45 }}
          selectedButtonStyle={{ backgroundColor: '#1089ff' }}
        />
        {
          (SearchRequestStore.search.isEventSearch === true) ?
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text h4 style={styles.title}>Fakultäten</Text>
                <Tooltip
                  height={80}
                  width={200}
                  withPointer={true}
                  popover={<Text>Welche Events welcher Fakultäten interessieren dich?</Text>}>
                  <Icon
                    name='info'
                    type='feather'
                    color='black'
                  />
                </Tooltip>
              </View>
              <Button
                containerStyle={styles.buttoncontainer}
                buttonStyle={styles.button}
                icon={{
                  name: "school",
                  type: "material-icons",
                  size: 20,
                  color: "white"
                }}
                title={
                  (SearchRequestStore.search.faculties)
                    ?
                    `${SearchRequestStore.search.faculties.length} ausgewählt`
                    :
                    'Fakultäten wählen...'
                }
                onPress={this._selectFacultiesButtonPressed}
              />
            </View>
            :
            null
        }
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Umkreis</Text>
          <Tooltip
            height={100}
            width={200}
            withPointer={true}
            popover={<Text>In welchem Umkreis von deinem ausgewählten Ort sollen dir Mitfahrgelegen-heiten angezeigt werden.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', marginRight: 20, marginLeft: 20, marginBottom: 20 }}>
          <Slider
            value={SearchRequestStore.search.radius}
            minimumValue={0}
            maximumValue={250}
            step={25}
            thumbTintColor='#1089ff'
            onValueChange={radius => this._searchRadiusSelected(radius)}
          />
          <Text style={{ fontSize: 20 }}>{SearchRequestStore.search.radius} km</Text>
        </View>
        <Button
          containerStyle={styles.buttoncontainer}
          buttonStyle={styles.searchButton}
          icon={{
            name: "search",
            type: "feather",
            size: 22,
            color: "white"
          }}
          title="SUCHEN"
          titleStyle={{ fontSize: 22 }}
          onPress={this._searchButtonPressed}
        />
      </ScrollView>
    )
  }
};

/** Style Object for the SearchFormScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 10,
  },
  buttoncontainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#1089ff'
  },
  searchButton: {
    backgroundColor: '#9b45e4',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10
  }
});

export default observer(SearchFormScreen);