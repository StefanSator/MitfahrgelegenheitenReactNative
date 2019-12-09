import React from 'react';
import { View, Stylesheet } from 'react-native';
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
      <View>
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
      </View>
    )
  }
};

export default EventCheckboxGroup;