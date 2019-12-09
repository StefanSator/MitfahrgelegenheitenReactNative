import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
import DistanceCalculator from '../../helpers/DistanceCalculator';

class PriceRecommendationScreen extends React.Component {

  static navigationOptions = {
    title: 'Preisvorschlag'
  };

  constructor(props) {
    super(props);
    // Set State Object
    this.state = {
      recommendedString: "Wird berechnet",
      recommendedPrice: 0
    }
    const { navigation } = this.props;
    this.lift = navigation.getParam('lift', null);
    // Get Recommended Price from Backend
    this._getRecommendedPrice();
  }

  /* Get the recommended price for the specified lift from Backend */
  async _getRecommendedPrice() {
    try {
      let response = await fetch(BackendURL + '/lifts/recommendedprice', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          point1: { lat: this.lift.start.lat, lng: this.lift.start.lng },
          point2: { lat: this.lift.target.lat, lng: this.lift.target.lng },
          passengers: this.lift.passengers
        }),
      });
      let responseJSON = await response.json();
      let recommendedPrice = Math.floor(responseJSON.price);
      // Update State Object
      this.setState({ recommendedString: `${recommendedPrice} €` , recommendedPrice: recommendedPrice});
    } catch (error) {
      console.error(error);
    }
  }

  /* Switch to PriceScreen. User can now choose own price for lift. */
  _chooseOwnPriceButtonPressed() {
    this.props.navigation.navigate('Price', {
      lift: this.lift
    });
  }

  /* Switch to OverviewAdScreen. User doesn't want money for lift. */
  _freeButtonPressed() {
    this.lift.price = 0;
    this.props.navigation.navigate('Event', {
      lift: this.lift
    });
  }

  /* Switch to OverviewAdScreen. User wants recommended Price for lift. */
  _recommendedPriceButtonPressed() {
    this.lift.price = this.state.recommendedPrice;
    this.props.navigation.navigate('Event', {
      lift: this.lift
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <PricingCard
            color="#4f9deb"
            title="Empfohlen"
            price={this.state.recommendedString}
            info={['Von uns empfohlener Preis.', 'Berechnet durch unseren Algorithmus.']}
            button={{ title: ' Empfohlenen Preis wählen', icon: 'check' }}
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
      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20639B"
  },
  cardTitle: {
    fontSize: 30
  },
  cardPricing: {
    fontSize: 35
  },
  cardInfo: {
    fontSize: 12
  },
  buttonTitle: {
    color: '#FF6666',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default PriceRecommendationScreen;