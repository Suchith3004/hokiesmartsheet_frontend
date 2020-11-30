import React, { Component, useEffect, useState } from 'react';
import fire from './config/Fire';
import CheckSheet from '../checksheet/Checksheet'
import Chat from '../utilities/Chat'
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'
import NavBar from '../utilities/NavBar'

const circleStyle = {
    display: 'block',
    marginLeft: '100px',
    marginRight: '100px',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    position: 'absolute',
    boxSizing: 'border-box',
    top: '50%',
    left: '50%',
    marginTop: '-50px',
    marginLeft: '-50px',
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
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
        const { firstName, lastName } = userData
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <motion.span
                style={circleStyle}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        } else {
            return (
                <div>
                    {userData.semesters ? (
                        <div>
                            <NavBar current="checksheet" />
                            <CheckSheet userData={userData} />
                        </div>
                    ) : (
                        <div>
                            <Chat/>
                        </div>
                    )}
                </div>
            );
        }

    }

}

export default StudentHome;

