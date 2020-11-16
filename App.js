import React, { Component } from 'react';
import "./App.css";
import fire from './login/config/Fire';
import Login from './login/login';
import Home from './login/StudentHome';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import StudentRegister from "./login/StudentRegister";
import MentorRegister from "./login/MentorRegister";
import DSemesterItem from "./checksheet/Class";
import Checksheet from "./checksheet/Checksheet";
import MentorProfile from "./mentor/MentorProfile";



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
          <MentorProfile/>
        // <div className="App">
        //   <Router>
        //     <Switch>
        //       <Route exact path="/" render={() => (
        //         this.state.user ? (
        //           <Redirect to="/home"/>
        //         ) : (
        //           <Redirect to="/login"/>
        //         )
        //       )}/>
        //       <Route path="/home" render={() => (
        //         this.state.user ? (
        //           <Home />
        //         ) : (
        //           <Redirect to="/login"/>
        //         )
        //       )}/>
        //       <Route path="/editcourses" render={() => (
        //           <StudentRegister />
        //         )}/>
        //       <Route path="/createUser" render={() => (
        //           <Home />
        //         )}/>
        //       <Route path="/login" render={() => (
        //         this.state.user ? (
        //           <Redirect to="/home"/>
        //         ) : (
        //           <Login />
        //         )
        //       )}/>
        //     </Switch>
        //   </Router>        </div>
      );
    }
  }
  
  export default App;
  
