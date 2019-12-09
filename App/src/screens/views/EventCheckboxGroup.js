import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

class EventCheckboxGroup extends React.Component {

  constructor(props) {
    super(props);
    this.selectedEvents = this.props.selectedEvents;
    this.callback = this.props.callback;
  }

  _removeEvent(name) {
    this.callback(name);
  }

  render() {
    this.selectedEvents = this.props.selectedEvents;
    return (
      <ScrollView style={styles.container}>
        {this.selectedEvents.map((value, index) => {
          return (
            <CheckBox
              key={index}
              center
              title={value}
              iconRight
              iconType='material'
              checkedIcon='clear'
              uncheckedIcon='add'
              checkedColor='red'
              checked={true}
              onPress={() => this._removeEvent(value)}
            />
          );
        })}
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginLeft: 10
  }
});

export default EventCheckboxGroup;