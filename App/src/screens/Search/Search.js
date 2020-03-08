import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchStartScreen from '../Search/SearchStart';
import SearchFormScreen from '../Search/SearchForm';
import FacultyFilterScreen from './FacultyFilter';
import SearchResultScreen from './SearchResult';

/** Stack Navigator containing all Components of the Search Process for Lifts. */
const SearchStack = createStackNavigator(
  {
    Search: SearchStartScreen,
    SearchForm: SearchFormScreen,
    FacultyFilter: FacultyFilterScreen,
    SearchResult: SearchResultScreen
  },
  {
    initialRouteName: 'Search',
    mode: 'modal'
  }
)

export default createAppContainer(SearchStack);