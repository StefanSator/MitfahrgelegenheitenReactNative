import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LiftStore from '../../stores/LiftStore';

/**
 * Class implementing the PriceRecommendationScreen Component.
 * @extends React.Component
 */
class PriceRecommendationScreen extends React.Component {

  static navigationOptions = {
    title: 'Preisvorschlag'
  };

  /**
   * Create a new PriceRecommendationScreen Component.
   * @param {Object} props properties which are passed to the component. 
   */
  constructor(props) {
    super(props);
    // Set State Object
    /** Local State Object of the Component. */
    this.state = {
      recommendedString: "Wird berechnet",
      recommendedPrice: 0
    }
    // Get Recommended Price from Backend
    this._getRecommendedPrice();
  }

  /**
   * Get the recommended price for the specified lift from the Backend Service.
   */
  async _getRecommendedPrice() {
    try {
      let response = await fetch(BackendURL + '/lifts/recommendedprice', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          point1: { lat: LiftStore.lift.start.lat, lng: LiftStore.lift.start.lng },
          point2: { lat: LiftStore.lift.target.lat, lng: LiftStore.lift.target.lng },
          passengers: LiftStore.lift.passengers
        }),
      });
      let responseJSON = await response.json();
      let recommendedPrice = Math.floor(responseJSON.price);
      // Update State Object
      this.setState({ recommendedString: `${recommendedPrice} €`, recommendedPrice: recommendedPrice });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Is called if user wants to choose own price.
   * Switches to PriceScreen Component, so that user can now choose own price for the Lift.
   */
  _chooseOwnPriceButtonPressed() {
    this.props.navigation.navigate('Price');
  }

  /**
   * Is called if the user chooses to advertise his lift for free.
   * Sets the Price in the global State Object and switches to the next Component in the process.
   */
  _freeButtonPressed() {
    LiftStore.setPrice(0);
    this.props.navigation.navigate('EventType');
  }

  /**
   * Is called if the user chooses the recommended Price for the lift.
   * Sets the Price in the global State Object and switches to the next Component in the process.
   */
  _recommendedPriceButtonPressed() {
    LiftStore.setPrice(this.state.recommendedPrice);
    this.props.navigation.navigate('EventType');
  }

  /** 
   * Renders the UI of the Component every time the state of the component has changed.
   * Inherited by React.Component. Every React Component must implement this function.
   * @returns {JSX} The User Interface to display on screen.
   */
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View>
          <PricingCard
            color="#fe346e"
            title="Empfohlen"
            price={this.state.recommendedString}
            info={['Von uns empfohlener Preis.', 'Berechnet durch unseren Algorithmus.']}
            button={{ title: ' Empfohlenen Preis wählen', icon: 'check' }}
            containerStyle={styles.cardContainer}
            pricingStyle={styles.cardPricing}
            titleStyle={styles.cardTitle}
            infoStyle={styles.cardInfo}
            onButtonPress={this._recommendedPriceButtonPressed.bind(this)}
          />
          <PricingCard
            color="#A640FF"
            title="Kostenlos"
            price="0 €"
            info={['Sei so nett, dass du Mitfahrer kostenlos bei dir mitfahren lässt.', 'Sie werden dir danken.']}
            button={{ title: ' Kostenlos mitfahren lassen', icon: 'check' }}
            containerStyle={styles.cardContainer}
            pricingStyle={styles.cardPricing}
            titleStyle={styles.cardTitle}
            infoStyle={styles.cardInfo}
            onButtonPress={this._freeButtonPressed.bind(this)}
          />
        </View>
        <Button
          title="Eigenen Preis wählen"
          type="outline"
          raised={true}
          titleStyle={styles.buttonTitle}
          onPress={this._chooseOwnPriceButtonPressed.bind(this)}
        />
      </ScrollView>
    )
  }

};

/** Style Object of the PriceRecommendationScreen Component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    backgroundColor: '#1089ff'
  },
  cardTitle: {
    fontSize: 30
  },
  cardPricing: {
    fontSize: 35
  },
  cardInfo: {
    color: 'white',
    fontSize: 12
  },
  buttonTitle: {
    color: '#1089ff',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default PriceRecommendationScreen;