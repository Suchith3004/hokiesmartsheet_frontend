import React, { Component } from 'react';
import NavBar from '../utilities/NavBar'
import dbFetch from "../api/dbFetch";
import fire from "../login/config/Fire";
import RecievedRequestsItem from "./RecievedRequestsItem";
import RecievedRequestsList from "./RecievedRequestsList";
import SentRequestsList from "./SentRequestsList";

class Requests extends Component {

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getUser/" + (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    userData: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    
    render() {
        return (
            <div>
                <NavBar current="chat"/>
                <RecievedRequestsList userData = {this.state.userData}/>
                {/*<SentRequestsList userData = {this.state.userData}/>*/}
            </div>
        );
    }

}

export default Requests;
