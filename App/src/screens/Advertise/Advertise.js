import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DestinationStateScreen from './DestinationState';
import DestinationCityScreen from './DestinationCity';
import CompanionScreen from './Companion';
import DateScreen from './Date';
import PriceScreen from './Price';
import OverviewAdScreen from './OverviewAd';
import PriceRecommendationScreen from './PriceRecommendation';
import EventScreen from './Event';
import AdvertiseStartScreen from './AdvertiseStart';

const AdvertiseStack = createStackNavigator(
  {
    Advertise: AdvertiseStartScreen,
    DestinationState: DestinationStateScreen,
    DestinationCity: DestinationCityScreen,
    Companion: CompanionScreen,
    Date: DateScreen,
    PriceRecommendation: PriceRecommendationScreen,
    Price: PriceScreen,
    OverviewAd: OverviewAdScreen,
    Event: EventScreen
  },
  {
    initialRouteName: 'Advertise',
    mode: 'modal'
  }
)

export default createAppContainer(AdvertiseStack);