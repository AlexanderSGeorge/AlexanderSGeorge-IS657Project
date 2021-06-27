import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {View, Text} from 'react-native';
import firebase from "firebase/app";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBYAq85SaEVcxzf_8kA67n8-j5cTp9sJtU",
  authDomain: "is657project.firebaseapp.com",
  projectId: "is657project",
  storageBucket: "is657project.appspot.com",
  messagingSenderId: "429526208296",
  appId: "1:429526208296:web:a485347668cdeae9174a1d",
  measurementId: "G-8GXC12E3QF"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}





import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
