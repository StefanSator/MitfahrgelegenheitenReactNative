import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StartScreen from './screens/Start';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';

global.BackendURL = 'https://young-beyond-20476.herokuapp.com';

/**
 * The Route Navigator of the App.
 */
const AppNavigator = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Start',
    headerMode: 'none'
  }
);

console.disableYellowBox = true;

export default createAppContainer(AppNavigator);