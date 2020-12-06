import React, { Component } from 'react';
import fire from '../login/config/Fire';
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import Logo from './logo_transparent_2.png';

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

}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}


export default class NavBar extends Component {

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

                <div class="topnav" id="myTopnav" >
                    <img src={Logo} height="40" width="70" style={{ float: "left", paddingTop: 5 }}alt='website logo' />
                    <a class="hokiesheetname" >HokieSmartSheet</a>

                    {userData.semesters ? (
                        <div>
                            <Link to="/home" className={(this.props.current === "checksheet") ? "active" : ''}>Checksheet</Link>
                            <Link to="/chat" className={(this.props.current === "chat") ? "active" : ''}>Chat</Link>
                            <Link to="/requests" className={(this.props.current === "requests") ? "active" : ''}>Requests</Link>
                            <Link to="/mentorsearch" className={(this.props.current === "mentorSearch") ? "active" : ''}>Mentor Search</Link>
                            <Link to="/about" className={(this.props.current === "about") ? "active" : ''}>About</Link>
                        </div>
                    ) : (
                            <div>
                                <Link to="/home" className={(this.props.current === "myprofile") ? "active" : ''}>My Profile</Link>
                                <Link to="/chat" className={(this.props.current === "chat") ? "active" : ''}>Chat</Link>
                                <Link to="/requests" className={(this.props.current === "requests") ? "active" : ''}>Requests</Link>
                                <Link to="/about" className={(this.props.current === "about") ? "active" : ''}>About</Link>
                            </div>
                        )}

                
                    <Link style={{ float: "right" }} class="logout" to="/login" onClick={()=>fire.auth().signOut()}>Logout</Link>
                    <a style={{ float: "right" }} class="username" >{firstName} {lastName}</a>
                </div>
            );
        }
    }

}
