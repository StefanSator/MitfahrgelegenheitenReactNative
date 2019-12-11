import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import EventCheckboxGroup from '../views/EventCheckboxGroup';
import InfoButton from '../views/InfoButton';
import StepProgressBar from '../views/StepProgressBar';

class EventScreen extends React.Component {

  static navigationOptions = {
    title: 'Event'
  };

  constructor() {
    super();
    this.state = {
      selectedEvents: [],
      progressIsVisible: false
    };
    this.events = [{
      name: 'Architektur'
    },
    {
      name: 'Angewandte Natur- und Kulturwissenschaften'
    },
    {
      name: 'Allgemeinwissenschaften'
    },
    {
      name: 'Bauingenieurwesen'
    },
    {
      name: 'Betriebswirtschaft'
    },
    {
      name: 'Elektro- und Informationstechnik'
    },
    {
      name: 'Informatik und Mathematik'
    },
    {
      name: 'Maschinenbau'
    },
    {
      name: 'Angewandte Sozial- und Gesundheitswissenschaften'
    }];
  }

  onSelectedItemsChange = selectedEvents => {
    this.setState({ selectedEvents: selectedEvents, progressIsVisible: this.state.progressIsVisible });
  };

  _removeSelectedEvent(name) {
    let index = this.state.selectedEvents.indexOf(name);
    if (index !== -1) {
      let duplicate = this.state.selectedEvents.slice();
      duplicate.splice(index, 1);
      this.setState({ selectedEvents: duplicate, progressIsVisible: this.state.progressIsVisible });
    }
  }

  /* Opens Overlay with Progress Information */
  _showProgressOverlay() {
    this.setState({ selectedEvents: this.state.selectedEvents, progressIsVisible: true });
  }

  /* Closes Overlay with Progress Information */
  _closeProgressOverlay() {
    this.setState({ selectedEvents: this.state.selectedEvents, progressIsVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <InfoButton
          containerStyle={styles.infobutton}
          buttonAction={this._showProgressOverlay.bind(this)}
        />
        <Text h4 style={styles.title}>Für welche Fakultäten ist dein Event interessant?</Text>
        <MultiSelect
          hideTags
          items={this.events}
          uniqueKey="name"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedEvents}
          selectText="Fakultäten auswählen"
          searchInputPlaceholderText="Suche eine Fakultät..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#0080ff"
          submitButtonText="Auswählen"
          styleInputGroup={styles.searchInput}
          styleMainWrapper={styles.dropDownMenu}
        />
        <EventCheckboxGroup
          selectedEvents={this.state.selectedEvents}
          callback={this._removeSelectedEvent.bind(this)} />
        <Button
          icon={{
            name: "arrowright",
            type: 'antdesign',
            size: 15,
            color: "white"
          }}
          title="Weiter"
        />
        <StepProgressBar
          steps={
            [
              {
                label: 'Ziel',
                notcompleted: false,
                currentStep: false
              },
              {
                label: 'Mitfahrer',
                notcompleted: false,
                currentStep: false
              },
              {
                label: 'Termin',
                notcompleted: false,
                currentStep: false
              },
              {
                label: 'Preis',
                notcompleted: false,
                currentStep: false
              },
              {
                label: 'Event',
                notcompleted: false,
                currentStep: true
              }
            ]
          }
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
    backgroundColor: "#20639B"
  },
  searchInput: {
    height: 40
  },
  title: {
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 50
  },
  dropDownMenu: {
    marginRight: 20,
    marginLeft: 20
  },
  infobutton: {
    alignSelf: 'flex-end',
    top: 0,
    marginLeft: 20,
    position: 'absolute'
  }
});

export default EventScreen;