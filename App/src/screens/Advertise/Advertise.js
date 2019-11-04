import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DestinationScreen from './Destination';
import CompanionScreen from './Companion';
import DateScreen from './Date';
import PriceScreen from './Price';
import OverviewAdScreen from './OverviewAd';

const AdvertiseStack = createStackNavigator(
  {
    Advertise: DestinationScreen,
    Companion: CompanionScreen,
    Date: DateScreen,
    Price: PriceScreen,
    OverviewAd: OverviewAdScreen
  },
  {
    initialRouteName: 'Advertise'
  }
)

export default createAppContainer(AdvertiseStack);