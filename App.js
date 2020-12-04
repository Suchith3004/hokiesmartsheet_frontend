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
import ChatPage from "./chat/ChatPage"
import SingleChatPage from "./chat/SingleChatPage"
// import Chat from "./chat/ChatPage"
import MentorList from "./mentor/MentorList";
import Requests from "./requests/Requests";
import SentRequestsList from "./requests/SentRequestsList";
import MentorHome from "./login/MentorHome";
import About from "./login/About";
import { motion } from 'framer-motion'

const circleStyle = {
  display: 'block',
  width: '7rem',
  height: '7rem',
  border: '0.5rem solid #e9e9e9',
  borderTop: '0.5rem solid #3498db',
  borderRadius: '50%',
  boxSizing: 'border-box',
  margin: 'auto auto'
}

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
}


class App extends Component {
  constructor() {
    super();
    this.state = ({ //puts user in a state 
      user: null,
      isLoaded: false
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => { //checks if user logged in 
      if (user) {
        this.setState({ user: user, isLoaded: true });
        localStorage.setItem('userId', user.uid);
      } else {
        this.setState({ user: null, isLoaded: true });
        localStorage.removeItem('userId');
      }
    });

  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <motion.span
            style={circleStyle}
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </div>)
    }
    else {
      return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" render={() => (
                this.state.user ? (
                  <Redirect to="/home" />
                ) : (
                    <Redirect to="/login" />
                  )
              )} />
              <Route path="/home" render={() => (
                this.state.user ? (
                  <Home />
                ) : (
                    <Redirect to="/login" />
                  )
              )} />
              <Route path="/createUser" render={() => (
                <Home />
              )} />
              <Route path="/login" render={() => (
                this.state.user ? (
                  <Redirect to="/home" />
                ) : (
                    <Login />
                  )
              )} />
              <Route path="/editcourses" component={StudentRegister} />
              <Route path="/myprofile" component={MentorHome} />
              <Route path="/chat" component={ChatPage} />
              <Route path="/requests" component={Requests} />
              <Route path="/mentorsearch" component={MentorList} />
              <Route path="/about" component={About} />
              <Route path="/singleChat/" component={SingleChatPage} />
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

export default App;

