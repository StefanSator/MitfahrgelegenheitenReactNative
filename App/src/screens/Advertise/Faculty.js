import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import FacultyCheckboxGroup from '../views/FacultyCheckboxGroup';
import InfoButton from '../views/InfoButton';
import StepProgressBar from '../views/StepProgressBar';
import Faculty from '../../entities/Faculty';
import LiftStore from '../../stores/LiftStore';
import Event from '../../entities/Event';
import { observer } from 'mobx-react';

/**
 * Class implementing the FacultyScreen Component.
 * @extends React.Component
 */
class FacultyScreen extends React.Component {

  static navigationOptions = {
    title: 'Event'
  };

  /**
   * Create a new FacultyScreen Component.
   */
  constructor() {
    super();
    console.log(LiftStore.lift);
    /** Local State Object of the Component. */
    this.state = {
      selectedFaculties: [],
      loading: true,
      progressIsVisible: false
    };
    /** Array containing the faculties of OTH Regensburg. */
    this.faculties = [];
    this._loadFacultyData();
  }

  /* Gets called if user selects or deselects a item in the list. */
  onSelectedItemsChange = selectedFaculties => {
    this.setState({
      selectedFaculties: selectedFaculties,
      loading: this.state.loading,
      progressIsVisible: this.state.progressIsVisible
    });
  };

  /**
   * Deselect a selected Faculty.
   * @param {String} name Name of the Faculty.
   */
  _removeSelectedFaculty(name) {
    let index = this.state.selectedFaculties.indexOf(name);
    if (index !== -1) {
      let duplicate = this.state.selectedFaculties.slice();
      duplicate.splice(index, 1);
      this.setState({
        selectedFaculties: duplicate,
        loading: this.state.loading,
        progressIsVisible: this.state.progressIsVisible
      });
    }
  }

  /**
   * Send GET-Request to the backend service to get all faculties of OTH Regensburg.
   */
  async _loadFacultyData() {
    try {
      let response = await fetch(BackendURL + '/lifts/event/faculties');
      const jsonResponse = await response.json();
      for (var i = 0; i < jsonResponse.length; i++) {
        let id = jsonResponse[i].facultyid;
        let name = jsonResponse[i].name;
        this.faculties.push(new Faculty(id, name));
      }
      this.setState({
        selectedFaculties: this.state.selectedFaculties,
        loading: false,
        progressIsVisible: this.state.progressIsVisible
      });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /**
   * Set the selected Faculties in the global State Object and switch to the next screen in the Advertise Process.
   */
  _nextButtonPressed() {
    if (this.state.selectedFaculties.length === 0) {
      Alert.alert('Bitte wählen Sie mindestens eine Fakultät aus.');
      return;
    }
    let eventFaculties = this.faculties.filter(faculty => this.state.selectedFaculties.includes(faculty.name));
    // Set Faculties in MobX Store
    LiftStore.lift.event.faculties = eventFaculties;
    // Change to Overview Screen
    this.props.navigation.navigate('OverviewAd');
  }

  /**
   *  Opens Overlay with Progress Information.
   */
  _showProgressOverlay() {
    this.setState({
      selectedFaculties: this.state.selectedFaculties,
      loading: this.state.loading,
      progressIsVisible: true
    });
  }

  /**
   * Closes Overlay with Progress Information.
   */
  _closeProgressOverlay() {
    this.setState({
      selectedFaculties: this.state.selectedFaculties,
      loading: this.state.loading,
      progressIsVisible: false
    });
  }

  /**
   * Displays automatically the MultiSelect Component, if the Faculty data has been retrieved from the backend.
   * @param {Boolean} loading True, if list elements are loading, else false.
   */
  _displayMultiselect(loading) {
    if (loading === false) {
      return (
        <View>
          <MultiSelect
            hideTags
            items={this.faculties}
            uniqueKey="name"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedFaculties}
            selectText="Fakultäten auswählen"
            searchInputPlaceholderText="Suche eine Fakultät..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#0080ff"
            submitButtonText="Auswählen"
            styleInputGroup={styles.searchInput}
            styleMainWrapper={styles.dropDownMenu}
          />
          <Button
            containerStyle={styles.nextButton}
            icon={{
              name: "arrowright",
              type: 'antdesign',
              size: 15,
              color: "white"
            }}
            title="Weiter"
            onPress={this._nextButtonPressed.bind(this)}
          />
          <FacultyCheckboxGroup
            selectedFaculties={this.state.selectedFaculties}
            callback={this._removeSelectedFaculty.bind(this)} />
        </View>
      );
    } else {
      return (
        <Text style={{ alignSelf: 'center', marginBottom: 20, color: 'black', fontSize: 20 }}>Daten werden geladen...</Text>
      );
    }
  }

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
        <View>
          <Text h4 style={styles.title}>Für welche Fakultäten ist dein Event interessant?</Text>
          {this._displayMultiselect(this.state.loading)}
        </View>
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
          currentStep={4}
          isVisible={this.state.progressIsVisible}
          closeCallback={this._closeProgressOverlay.bind(this)}
        />
      </View>
    );
  }
};

/** Style Object of the FacultyScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  searchInput: {
    borderWidth: 1,
    height: 40
  },
  title: {
    color: 'black',
    marginLeft: 20,
    marginTop: -45,
    marginBottom: 10,
    marginRight: 50
  },
  dropDownMenu: {
    marginRight: 20,
    marginLeft: 20
  },
  infobutton: {
    alignSelf: 'flex-end',
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginTop: 5,
    marginBottom: 5,
    width: 100
  }
});

export default observer(FacultyScreen);