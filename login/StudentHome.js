import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import fire from './config/Fire';
import MentorRegister from './MentorRegister';
import StudentRegister from './StudentRegister';




class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.courseEdit = this.courseEdit.bind(this);
        this.coursePlan = this.coursePlan.bind(this);


    }

    logout() {
        fire.auth().signOut();
    }
    courseEdit() {
        //<StudentRegister /> //this renders home 
        useHistory.push(StudentRegister);

    }
    coursePlan() {
       // <MentorRegister /> //this renders home 
    }
    

    render() {
        return (
            <div>
                <h1>Welcome to the Student Page</h1>
                <button onClick={this.logout}>Logout</button>
                <button onClick={this.courseEdit}>Edit your courses taken</button>
                <button onClick={this.coursePlan}>Course Plan</button>


            </div>
        );

    }

}
export default StudentHome;


