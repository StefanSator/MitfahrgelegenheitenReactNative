import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Faculty from '../../entities/Faculty';
import MultiSelect from 'react-native-multiple-select';
import FacultyCheckboxGroup from '../views/FacultyCheckboxGroup';
import SearchRequestStore from '../../stores/SearchRequestStore';

class FacultyFilterScreen extends React.Component {

  static navigationOptions = {
    title: 'Filter'
  };

  constructor() {
    super();
    this.state = {
      selectedFaculties: [],
      loading: true
    };
    this.faculties = [];
    this._loadFacultyData();
  }

  onSelectedItemsChange = selectedFaculties => {
    this.setState({
      selectedFaculties: selectedFaculties,
      loading: this.state.loading
    });
  };

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