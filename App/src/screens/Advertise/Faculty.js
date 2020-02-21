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

class FacultyScreen extends React.Component {

  static navigationOptions = {
    title: 'Event'
  };

  constructor() {
    super();
    console.log(LiftStore.lift);
    this.state = {
      selectedFaculties: [],
      loading: true,
      progressIsVisible: false
    };
    this.faculties = [];
    this._loadFacultyData();
  }

  onSelectedItemsChange = selectedFaculties => {
    this.setState({
      selectedFaculties: selectedFaculties,
      loading: this.state.loading,
      progressIsVisible: this.state.progressIsVisible
    });
  };

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

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    this.setState({
      selectedFaculties: this.state.selectedFaculties,
      loading: this.state.loading,
      progressIsVisible: true
    });
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    this.setState({
      selectedFaculties: this.state.selectedFaculties,
      loading: this.state.loading,
      progressIsVisible: false
    });
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