import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AccountStartScreen from './AccountStart';

const SearchStack = createStackNavigator(
  {
    Account: AccountStartScreen,
  },
  {
    initialRouteName: 'Account',
    mode: 'modal'
  }
)

export default createAppContainer(SearchStack);