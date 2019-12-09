import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import EventCheckboxGroup from '../views/EventCheckboxGroup';

class EventScreen extends React.Component {

  static navigationOptions = {
    title: 'Event'
  };

  constructor() {
    super();
    this.state = {
      selectedEvents: []
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
    this.setState({ selectedEvents });
  };

  _removeSelectedEvent(name) {
    let index = this.state.selectedEvents.indexOf(name);
    if (index !== -1) {
      let duplicate = this.state.selectedEvents.slice();
      duplicate.splice(index, 1);
      this.setState({ selectedEvents: duplicate });
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20
  },
  dropDownMenu: {
    marginRight: 20,
    marginLeft: 20
  }
});

export default EventScreen;