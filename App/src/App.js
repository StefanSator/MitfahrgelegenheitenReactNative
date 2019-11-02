import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StartScreen from './screens/Start';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import DestinationScreen from './screens/Advertise/Destination';
import CompanionScreen from './screens/Advertise/Companion';

global.BackendURL = 'http://localhost:3000';

const AppNavigator = createStackNavigator(
  {
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeScreen,
    Advertise: DestinationScreen,
    Companion: CompanionScreen
  },
  {
    initialRouteName: 'Start'
  }
);

export default createAppContainer(AppNavigator);