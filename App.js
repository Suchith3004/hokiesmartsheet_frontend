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
      if (user) {
        this.setState({ user });
        localStorage.setItem('userId', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('userId');
      }
    });
  }

  render() {
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

export default App;

