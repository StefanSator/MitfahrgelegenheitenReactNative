import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Faculty from '../../entities/Faculty';
import MultiSelect from 'react-native-multiple-select';
import FacultyCheckboxGroup from '../views/FacultyCheckboxGroup';
import SearchRequestStore from '../../stores/SearchRequestStore';

/**
 * Class implementing the FacultyFilterScreen Component.
 * @extends React.Component
 */
class FacultyFilterScreen extends React.Component {

  static navigationOptions = {
    title: 'Filter'
  };

  /**
   * Create new FacultyFilterScreen Component.
   */
  constructor() {
    super();
    /** Local State Object of the Component. */
    this.state = {
      selectedFaculties: [],
      loading: true
    };
    /** Array containing all available Faculties. */
    this.faculties = [];
    this._loadFacultyData();
  }

  /* Gets called if user selects or deselects a item in the list. */
  onSelectedItemsChange = selectedFaculties => {
    this.setState({
      selectedFaculties: selectedFaculties,
      loading: this.state.loading
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
        loading: this.state.loading
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
        loading: false
      });
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }

  /**
   * Set the selected Faculties in the global State Object and return to previous screen.
   */
  _nextButtonPressed() {
    if (this.state.selectedFaculties.length === 0) {
      Alert.alert('Bitte wählen Sie mindestens eine Fakultät aus.');
      return;
    }
    let filterFaculties = this.faculties.filter(faculty => this.state.selectedFaculties.includes(faculty.name));
    // Set Faculties in MobX Store
    SearchRequestStore.setFaculties(filterFaculties);
    // Change to Overview Screen
    this.props.navigation.goBack();
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
              name: "check",
              type: 'antdesign',
              size: 15,
              color: "white"
            }}
            title="Bestätigen"
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
        <View>
          <Text h4 style={styles.title}>Welche Events welcher Fakultäten interessieren dich?</Text>
          {this._displayMultiselect(this.state.loading)}
        </View>
      </View>
    )
  }
}

/** Style Object of the FacultyFilterScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    color: 'black',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 50
  },
  searchInput: {
    borderWidth: 1,
    height: 40
  },
  dropDownMenu: {
    marginRight: 20,
    marginLeft: 20
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginTop: 5,
    marginBottom: 5,
    width: 150
  }
});

export default FacultyFilterScreen;