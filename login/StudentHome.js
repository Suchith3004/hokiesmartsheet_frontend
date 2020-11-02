import React, { Component, useState } from 'react';
import fire from './config/Fire';
import Course from '../checksheet/Course'

class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Welcome to the Student Page</h1>
                <button onClick={this.logout}>Logout</button>
                <Course name="CS 2114"/>
            </div>
        );

    }

}

export default StudentHome;

