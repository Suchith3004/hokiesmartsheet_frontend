import React, { Component } from 'react';
import NavBar from '../utilities/NavBar'
import dbFetch from "../api/dbFetch";
import fire from "../login/config/Fire";
import RecievedRequestsList from "./RecievedRequestsList";
import SentRequestsList from "./SentRequestsList";
import { motion } from "framer-motion";

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

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            userData: null,
            viewType: 'student'
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
                    userData: data,
                    viewType: data.isMentor ? 'mentor' : 'student'
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
        const { error, isLoaded } = this.state;
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
                    <NavBar current="requests" />

                    {this.state.userData.isMentor && this.state.userData.semesters ? (
                        <div className="inpageNav">
                            <button id="firstbtn" onClick={() => this.setState({ viewType: "mentor" })}
                                className={this.state.viewType === "mentor" ? "active" : ''}>Mentor
                            </button>
                            <button id="lastbtn" onClick={() => this.setState({ viewType: "student" })}
                                className={this.state.viewType === "student" ? "active" : ''}>Student
                            </button>
                        </div>
                    ) : <span />}

                    {this.state.viewType === 'student' ? (
                        <SentRequestsList userData={this.state.userData} />
                    ) : (
                            <RecievedRequestsList userData={this.state.userData} />
                        )}
                </div>
            )
        };

    }

}
export default Requests;
