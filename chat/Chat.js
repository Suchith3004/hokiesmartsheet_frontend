import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import List from '../utilities/List'
import MentorProfile from "../mentor/MentorProfile";
import MenteeProfile from "../mentor/MenteeProfile";
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const Container = styled.div`
    display: flex;
    margin-bottom: 100px;
    margin-top: 20px
`;

class MentorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            connections: [],
            selected: null,
            userData: {},
            viewType: 'mentors'
        }
    }

    componentDidMount() {
        dbFetch.post({
            endpoint: "/getAllUserConnections/",
            data: {
                userId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid)
            }
        })
            .then(response => response.json())
            .then((data) => {

                this.setState({
                    connections: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch all connections data: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });

        dbFetch.get({
            endpoint: "/getUser/" + (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then(response => response.json())
            .then((data) => {

                console.log(data)
                this.setState({
                    isLoaded: true,
                    userData: data,
                    viewType: data.mentors && data.mentors.length > 0 ? "mentors" : 'mentees'
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


    handleClick = (e) => {
        this.setState({
            selected: e,
        })
    }

    mentorItem(mentor) {
            return <div className="mentor-list-item">
                <div id="mentor-img">
                    <img
                        src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                        alt="new"
                    />
                </div>
                <div className='mentor-short-info'>
                    <h2 style={{ margin: 5 }}>{mentor.firstName + ' ' + mentor.lastName}</h2>
                    <h5>{"Occupation: " + mentor.occupation}</h5>
                    <h5>{"Organization: " + mentor.organizationName}</h5>
                </div>
            </div>
    }

    menteeItem(mentor) {
        return <div className="mentor-list-item">
        <div id="mentor-img">
            <img
                src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                alt="new"
            />
        </div>
        <div className='mentor-short-info'>
            <h2 style={{ margin: 5 }}>{mentor.firstName + ' ' + mentor.lastName}</h2>
            <h5>{"Major: " + mentor.major}</h5>
            <h5>{"Graduation Year: " + mentor.gradYear}</h5>
        </div>
    </div>
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

            const getFilteredConnections = () => {

                const mentors = []
                const mentees = []

                this.state.connections.forEach(user => {
                    if (user.isUsersMentor)
                        mentors.push(user)
                    else
                        mentees.push(user)
                })


                if (this.state.viewType === 'mentees') {
                    return mentees
                }
                else {
                    return mentors
                }
            }

            return (
                <div>
                    <NavBar current="chat" />
                    {this.state.userData.isMentor && this.state.userData.semesters ? (
                        <div className="inpageNav">
                            <button id="firstbtn" onClick={() => this.setState({ viewType: "mentees", selected: null })}
                                className={this.state.viewType === "mentees" ? "active" : ''}>Mentees
                            </button>
                            <button id="lastbtn" onClick={() => this.setState({ viewType: "mentors", selected: null })}
                                className={this.state.viewType === "mentors" ? "active" : ''}>Mentors
                            </button>
                        </div>
                    ) : <span />}

                    <Container>
                        <div className="mentor-list">

                            <h1
                                style={{ padding: 15, color: 'white' }}
                            > {this.state.viewType === 'mentees' ? 'Your Mentees' : 'Your Mentors'}</h1>

                            {this.state.connections.length > 0 ? (
                                <List elements={getFilteredConnections()}
                                    key={0}
                                    getListElem={this.state.viewType === 'mentees' ? this.menteeItem : this.mentorItem}
                                    handleClick={this.handleClick} />
                            ) : (

                                    <div className='empty-search'>

                                        {this.state.viewType === 'mentors' ? (
                                            <div>

                                                <h3
                                                    style={{ paddingBottom: 15 }}
                                                >Your have no mentor connections</h3>
                                                <br />
                                                <Link to='/mentorsearch'>Search for a mentor</Link>
                                            </div>
                                        ) : (

                                                <h3
                                                    style={{ paddingBottom: 15 }}
                                                >Your have no mentee connections</h3>
                                            )}
                                    </div>
                                )}
                        </div>

                        {this.state.connections.length > 0 || this.state.selected != null ? (
                            <div className='search-page-details'>
                                <h1
                                    style={{ paddingBottom: 20 }}
                                > {this.state.viewType === 'mentees' ? 'Selected Mentee' : 'Selected Mentor'}</h1>
                                {!this.state.selected || this.state.selected.isUsersMentor ? (

                                    <MentorProfile
                                        uid={this.state.selected ? this.state.selected.userId : null} otherUserData={this.state.selected}
                                    />
                                ) : (
                                        <MenteeProfile
                                            uid={this.state.selected ? this.state.selected.userId : null} otherUserData={this.state.selected}
                                        />
                                    )}
                            </div>
                        ) : (
                                <span />
                            )}
                    </Container>
                </div>
            );
        }
    }
}

export default MentorList;
