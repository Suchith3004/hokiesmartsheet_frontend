import React, { Component, useState } from 'react';
import fire from './config/Fire';
import CheckSheet from '../checksheet/Checksheet'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
text-align: center;
background-color: lightblue;
`;

/*
const LogoutButton = styled.button`
   position:fixed;
   right:10px;
   top:5px;
`;
*/

function LogoutButton(props) {

    let history = useHistory();
  
    function handleClick() {
        fire.auth().signOut();
        history.push("/login");
    }
  
    return (
      <button type="button" style={{position: "fixed", right:"10px", top:"5px"}} onClick={handleClick}>
        Logout
      </button>
    );
  }

class StudentHome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Welcome to the Student Page</h1>
                    <Link to="/editcourses">
                        <button onClick={this.courseEdit}>Edit your courses taken</button>
                    </Link>
                    <LogoutButton />

                    <div><text> Our goal is to provide an efficient way to plan out your semesters here at Virginia Tech. We aim to help organize what courses you will be taking every semester, depending on your major and minor. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on similar interests.
                    </text></div>

                </Container>
                <CheckSheet initialData = {this.state} />
            </div>
        );

    }

}

export default StudentHome;

