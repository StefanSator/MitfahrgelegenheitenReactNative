import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DestinationStateScreen from './DestinationState';
import DestinationCityScreen from './DestinationCity';
import CompanionScreen from './Companion';
import DateScreen from './Date';
import PriceScreen from './Price';
import OverviewAdScreen from './OverviewAd';
import PriceRecommendationScreen from './PriceRecommendation';

const AdvertiseStack = createStackNavigator(
  {
    Advertise: DestinationStateScreen,
    Destination: DestinationCityScreen,
    Companion: CompanionScreen,
    Date: DateScreen,
    PriceRecommendation: PriceRecommendationScreen,
    Price: PriceScreen,
    OverviewAd: OverviewAdScreen
  },
  {
    initialRouteName: 'Advertise'
  }
)

export default createAppContainer(AdvertiseStack);