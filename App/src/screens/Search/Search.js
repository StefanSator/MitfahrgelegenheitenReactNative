import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchStartScreen from '../Search/SearchStart';
import SearchFormScreen from '../Search/SearchForm';

const SearchStack = createStackNavigator(
  {
    Search: SearchStartScreen,
    SearchForm: SearchFormScreen
  },
  {
    initialRouteName: 'Search',
    mode: 'modal'
  }
)

export default createAppContainer(SearchStack);