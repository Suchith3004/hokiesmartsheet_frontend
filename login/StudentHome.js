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
padding: 30px;
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

class StudentHome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>

                    <label style={{ fontSize: 60, backgroundColor: 10000, textAlign: "center" }}>Welcome to the Student Page </label>

                    <label> Our goal is to provide an efficient way to plan out your semesters here at Virginia Tech. We aim to help organize what courses you will be taking every semester, depending on your major and minor. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on similar interests.
</label>
                    <div>
                        <Link to="/editcourses">
                        <button style={{ borderRadius: 10, width: 200, boxShadow: 10, padding: 10, align: 100 }} onClick={this.courseEdit}>Edit Courses</button>
                        </Link>
                        <LogoutButton/>
                    </div>
                    
                    <CheckSheet/>

                </Container>
            </div>
            

        );

    }

}

export default StudentHome;

