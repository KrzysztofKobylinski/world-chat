import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';

const RootStack = createStackNavigator({
	Login: { screen: Login },
	Signup: { screen: Signup },
	Chat: { screen: Chat }
});

const App = createAppContainer(RootStack);

export default App;