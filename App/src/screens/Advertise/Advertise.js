import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DestinationScreen from './Destination';
import CompanionScreen from './Companion';
import DateScreen from './Date';
import PriceScreen from './Price';

const AdvertiseStack = createStackNavigator(
  {
    Advertise: DestinationScreen,
    Companion: CompanionScreen,
    Date: DateScreen,
    Price: PriceScreen
  },
  {
    initialRouteName: 'Advertise'
  }
)

export default createAppContainer(AdvertiseStack);