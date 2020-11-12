import React, { Component, useEffect, useState } from 'react';
import fire from './config/Fire';
import CheckSheet from '../checksheet/Checksheet'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import dbFetch from '../api/dbFetch'

const Container = styled.div`
text-align: center;
background-color: #a24857;
position: absolute;
top:
`;

function LogoutButton(props) {

    let history = useHistory();

    function handleClick() {
        fire.auth().signOut();
        history.push("/login");
    }

    return (
        <button style={{ borderRadius: 10, width: 200, boxShadow: 10, padding: 10 }} onClick={handleClick}>Logout</button>
    );
}

class MentorHome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>

                    <label style={{ fontSize: 60, backgroundColor: 10000, textAlign: "center" }}>Welcome to the Mentor Page </label>

                    <label> Our goal is to provide a way to provide support here at Virginia Tech. We aim to help you develop a strong network of connections by connecting you to students that have similar interests as you. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on academics, hobbies, and interests. 
</label>
                    <div>
                    
                        <LogoutButton/></div>


                </Container>
                <CheckSheet />
            </div>
        );

    }

}

export default MentorHome;

