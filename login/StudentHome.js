import React, { Component, useEffect, useState } from 'react';
import fire from './config/Fire';
import CheckSheet from '../checksheet/Checksheet'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import dbFetch from '../api/dbFetch'
import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Sidebar } from 'primereact/sidebar';
import { motion } from 'framer-motion'


const Container = styled.div`
text-align: center;
background-color: #a24857;
position: absolute;
top:
`;

const circleStyle = {
    display: 'block',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}


function LogoutButton(props) {

    let history = useHistory();

    function handleClick() {
        fire.auth().signOut();
        history.push("/login");
    }

    return (
        <button style={{ borderRadius: 10, width: 150, boxShadow: 10, padding: 10, marginLeft: 150, position: "absolute", top: 40, right: 40 }} onClick={handleClick}>Logout</button>
    );
}


class StudentHome extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isLoaded: false,
            error: null,
            userData: {}
        }
    }

    componentDidMount() {
        console.log((localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid))
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
        const { error, isLoaded, userData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            console.log(userData)
            return <motion.span
                style={circleStyle}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        } else {
            return (
                <div>
                    <CheckSheet userData={userData} />

                    {/* <Container>
                    <label style={{ fontSize: 60, backgroundColor: 10000, textAlign: "center" }}>My Checksheet </label>
                    <div style={{ backgroundColor: '#a24857' }}>
                        <Link to="/editcourses">
                            <button style={{ borderRadius: 10, width: 150, boxShadow: 10, padding: 10, align: 100, position: "absolute", top : 90, right : 40 }} onClick={this.courseEdit}>Edit Courses</button>
                        </Link>
                        <LogoutButton />
                    </div>
                    <CheckSheet userData={this.state.userData}/>
                    <label style = {{marginTop :"5s0px"}}> Our goal is to provide an efficient way to plan out your semesters here at Virginia Tech. We aim to help organize what courses you will be taking every semester, depending on your major and minor. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on similar interests.
                </label>
                </Container> */}
                </div>
            );
        }

    }

}

export default StudentHome;

