import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import "./App.css";
import fire from './login/config/Fire';
import Login from './login/login';
import Home from  './login/Home';

class App extends Component {
    constructor() {
      super();
      this.state = ({ //puts user in a state 
        user: null,
      });
      this.authListener = this.authListener.bind(this);
    }
  
    componentDidMount() {
      this.authListener();
    }
  
    authListener() {
      fire.auth().onAuthStateChanged((user) => { //checks if user logged in 
        console.log(user);
        if (user) {
          this.setState({ user });
          localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null });
          localStorage.removeItem('user');
        }
      });
    }
  
    render() {
      return (
        <div className="App">
          {this.state.user ? ( //checks if user is logged in, then goes to home
            <Home /> //this renders home 
          ) :
            (
              <Login /> //if user is not logged in, renders Login. 
            )}
        </div>
      );
    }
  }
  
  export default App;
  
