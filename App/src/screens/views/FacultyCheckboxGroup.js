import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

class FacultyCheckboxGroup extends React.Component {

  constructor(props) {
    super(props);
    this.selectedFaculties = this.props.selectedFaculties;
    this.callback = this.props.callback;
  }

  _removeFaculty(name) {
    this.callback(name);
  }

  render() {
    this.selectedFaculties = this.props.selectedFaculties;
    return (
      <ScrollView style={styles.container}>
        {this.selectedFaculties.map((value, index) => {
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
              onPress={() => this._removeFaculty(value)}
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

export default FacultyCheckboxGroup;