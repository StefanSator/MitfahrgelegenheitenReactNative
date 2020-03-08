import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

/**
 * Class implementing the FacultyCheckboxGroup Component.
 * @extends React.Component
 */
class FacultyCheckboxGroup extends React.Component {

  /**
   * Creates a new FacultyCheckboxGroup Component.
   * @param {Object} props properties which are passed to the component, to instantiate the Component
   * from outside of the Component.
   */
  constructor(props) {
    super(props);
    /** Faculties to display as selected in the CheckboxGroup. */
    this.selectedFaculties = this.props.selectedFaculties;
    /** Callback-Function, to trigger when a Checkbox in the Group is clicked. */
    this.callback = this.props.callback;
  }

  /** Triggers the Callback-Function, which was passed as a prop, if user taps a Checkbox. */
  _removeFaculty(name) {
    this.callback(name);
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
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

/** Style Object for the FacultyCheckboxGroup. */
const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginLeft: 10
  }
});

export default FacultyCheckboxGroup;