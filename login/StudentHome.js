import React, { Component, useState } from 'react';
import fire from './config/Fire';
import CheckSheet from '../checksheet/Checksheet'
import styled from "styled-components";


const Container = styled.div`
text-align: center;
background-color: lightblue;
`;

const LogOut = styled.button`
   position:fixed;
   right:10px;
   top:5px;
`;


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
                <Container>
                    <h1>Welcome to the Student Page</h1>
                    <button onClick={this.back}>Back</button>
                    <button onClick={this.courseEdit}>Edit your courses taken</button>
                    <LogOut  onClick={this.logout}>Logout</LogOut>

                    <div><text> Our goal is to provide an efficient way to plan out your semesters here at Virginia Tech. We aim to help organize what courses you will be taking every semester, depending on your major and minor. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on similar interests.
                    </text></div>

                </Container>
                <CheckSheet initialData = {this.state} />
            </div>
        );

    }

}

export default StudentHome;

