import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import fire from './config/Fire';
import MentorRegister from './MentorRegister';
import StudentRegister from './StudentRegister';
import Back from'./StudentHome';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
text-align: center;
background-color: lightblue;
`;



class StudentHome extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.courseEdit = this.courseEdit.bind(this);
        this.back = this.back.bind(this);


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
    back() {
        // <MentorRegister /> //this renders home 
    }

    render() {

        return (
            <Container>
                <h1>Welcome to the Student Page</h1>
                <button onClick={this.back}>Back</button>
                <button onClick={this.courseEdit}>Edit your courses taken</button>
                <button onClick={this.logout}>Logout</button>

                <div><text> Our goal is to provide an efficient way to plan out your semesters here at Virginia Tech. We aim to help organize what courses you will be taking every semester, depending on your major and minor. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on similar interests.
</text></div>


            </Container>
        );


    }

}
export default StudentHome;


