import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, ButtonGroup, Slider, Tooltip, Icon } from 'react-native-elements';

class SearchFormScreen extends React.Component {

  static navigationOptions = {
    title: 'Suche'
  };

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      sliderValue: 0
    }
    this._updateSelectedEventIndex = this._updateSelectedEventIndex.bind(this);
  }

  _updateSelectedEventIndex(selectedIndex) {
    this.setState({ selectedIndex: selectedIndex, sliderValue: this.state.sliderValue });
  }

  render() {
    const buttons = ['Private Fahrt', 'Event']
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Ort</Text>
          <Tooltip
            height={60}
            width={200}
            withPointer={true}
            popover={<Text>Wähle den Ort deiner geplanten Reise aus.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <Button
          containerStyle={styles.buttoncontainer}
          buttonStyle={styles.button}
          icon={{
            name: "location-pin",
            type: "entypo",
            size: 20,
            color: "white"
          }}
          title="Stadt wählen..."
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Termin</Text>
          <Tooltip
            height={60}
            width={200}
            withPointer={true}
            popover={<Text>Wähle den Termin für deine geplante Reise aus.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <Button
          containerStyle={styles.buttoncontainer}
          buttonStyle={styles.button}
          icon={{
            name: "calendar",
            type: "entypo",
            size: 18,
            color: "white"
          }}
          title="Datum wählen..."
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Art</Text>
          <Tooltip
            height={80}
            width={200}
            withPointer={true}
            popover={<Text>Planst du eine private Fahrt oder möchtest du auf ein Event fahren.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <ButtonGroup
          onPress={this._updateSelectedEventIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 45 }}
          selectedButtonStyle={{ backgroundColor: '#1089ff' }}
        />
        {
          (this.state.selectedIndex === 1) ?
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text h4 style={styles.title}>Fakultäten</Text>
                <Tooltip
                  height={80}
                  width={200}
                  withPointer={true}
                  popover={<Text>Welche Events welcher Fakultäten interessieren dich?</Text>}>
                  <Icon
                    name='info'
                    type='feather'
                    color='black'
                  />
                </Tooltip>
              </View>
              <Button
                containerStyle={styles.buttoncontainer}
                buttonStyle={styles.button}
                icon={{
                  name: "school",
                  type: "material-icons",
                  size: 20,
                  color: "white"
                }}
                title="Fakultäten wählen..."
              />
            </View>
            :
            null
        }
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={styles.title}>Umkreis</Text>
          <Tooltip
            height={100}
            width={200}
            withPointer={true}
            popover={<Text>In welchem Umkreis von deinem ausgewählten Ort sollen dir Mitfahrgelegen-heiten angezeigt werden.</Text>}>
            <Icon
              name='info'
              type='feather'
              color='black'
            />
          </Tooltip>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', marginRight: 20, marginLeft: 20, marginBottom: 20 }}>
          <Slider
            value={this.state.sliderValue}
            minimumValue={0}
            maximumValue={75}
            step={25}
            thumbTintColor='#1089ff'
            onValueChange={value => this.setState({ selectedIndex: this.state.selectedIndex, sliderValue: value })}
          />
          <Text style={{ fontSize: 20 }}>{this.state.sliderValue} km</Text>
        </View>
        <Button
          containerStyle={styles.buttoncontainer}
          buttonStyle={styles.searchButton}
          icon={{
            name: "search",
            type: "feather",
            size: 22,
            color: "white"
          }}
          title="SUCHEN"
          titleStyle={{ fontSize: 22 }}
        />
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 10,
  },
  buttoncontainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#1089ff'
  },
  searchButton: {
    backgroundColor: '#9b45e4',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10
  }
});

export default SearchFormScreen;