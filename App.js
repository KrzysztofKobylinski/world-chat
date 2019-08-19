import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
    import Translator from './components/Translator';
/* import Login from './components/Login'; */
/* import Signup from './components/Signup'; */
/* import Chat from './components/Chat'; */

const RootStack = createStackNavigator({
  Translator: { screen: Translator },
	/* Login: { screen: Login }, */
/* 	Signup: { screen: Signup }, */
	/* Chat: { screen: Chat } */
});

const App = createAppContainer(RootStack);

export default App;