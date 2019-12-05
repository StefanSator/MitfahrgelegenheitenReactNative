import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
import DistanceCalculator from '../../helpers/DistanceCalculator';

// TODO: Give Price Recommendation for distance from target with PriceCard

class PriceRecommendationScreen extends React.Component {

  static navigationOptions = {
    title: 'Preisvorschlag'
  };

  constructor(props) {
    super(props);
    // Load List Data
    /* const { navigation } = props;
    this.destinationState = navigation.getParam('destinationState', '');
    this._loadCityData(this.destinationState); */
  }

  _chooseOwnPriceButtonPressed() {
    try {
      let distanceCalculator = new DistanceCalculator(49.034512, 12.119234);
      let haversineDistance = distanceCalculator.calculateHaversineDistance(48.881259, 12.573853);
      console.log("Haversine: " + haversineDistance);
      let vincentyDistance = distanceCalculator.calculateVincentyDistance(48.881259, 12.573853);
      console.log("Vincenty: " + vincentyDistance);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <PricingCard
            color="#4f9deb"
            title="Empfohlen"
            price="12 €"
            info={['Von uns empfohlener Preis.', 'Berechnet durch unseren Algorithmus.']}
            button={{ title: ' Empfohlenen Preis wählen', icon: 'check' }}
            pricingStyle={styles.cardPricing}
            titleStyle={styles.cardTitle}
            infoStyle={styles.cardInfo}
          />
          <PricingCard
            color="#A640FF"
            title="Kostenlos"
            price="0 €"
            info={['Sei so nett, dass du Mitfahrer kostenlos bei dir mitfahren lässt.', 'Sie werden dir danken.']}
            button={{ title: ' Kostenlosen Preis wählen', icon: 'check' }}
            pricingStyle={styles.cardPricing}
            titleStyle={styles.cardTitle}
            infoStyle={styles.cardInfo}
          />
        </View>
        <Button
          title="Eigenen Preis wählen"
          type="outline"
          raised={true}
          titleStyle={styles.buttonTitle}
          onPress={this._chooseOwnPriceButtonPressed}
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