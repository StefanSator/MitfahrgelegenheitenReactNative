import React from 'react';
import { View, Stylesheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import EventCheckboxGroup from '../views/EventCheckboxGroup';

class EventScreen extends React.Component {

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
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={this.events}
          uniqueKey="name"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedEvents}
          selectText="Fakultäten auswählen"
          searchInputPlaceholderText="Suche eine Fakultät..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#20639B"
          submitButtonText="Submit"
        />
        <View>
          <EventCheckboxGroup
            selectedEvents={this.state.selectedEvents}
            callback={this._removeSelectedEvent.bind(this)} />
        </View>
      </View>
    );
  }
};

export default EventScreen;