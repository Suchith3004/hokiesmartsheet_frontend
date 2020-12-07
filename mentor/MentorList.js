import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import List from '../utilities/List'
import MentorProfile from "./MentorProfile";
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import { motion } from "framer-motion";
import { Link }  from "react-router-dom";

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
            mentors: [],
            selected: null,
            userData: {}
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllMentors/" + (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    mentors: data,
                });

            })
            .catch((error) => {
                console.error("Failed to fetch all mentors data: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });

        dbFetch.get({
            endpoint: "/getUser/" +  (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
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
                console.error("Failed to fetch mentor data: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });

    }

    deleteMentor = (uid) => {
        this.setState({
            mentors: this.state.mentors.filter(function (obj) {
                return obj.userId !== uid;
            }),
        })
    }

    handleClick = (e) => {
        this.setState({
            selected: e.userId,
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
                <h2
                    style={{ margin: 5 }}>{mentor.name}</h2>
                <h5>{"Occupation: " + mentor.occupation}</h5>
                <h5>{"Organization: " + mentor.organizationName}</h5>
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
            return (
                <div>
                    <NavBar current="mentorSearch" />
                    <Container>
                        <div className="mentor-list">

                            <h1
                                style={{ padding: 15, color: 'white' }}
                            > Available Mentors</h1>

                            {this.state.mentors.length > 0 ? (
                                <List elements={this.state.mentors}
                                    key={0}
                                    getListElem={this.mentorItem}
                                    handleClick={this.handleClick} />
                            ) : (
                                    <h3
                                        style={{ paddingBottom: 15 }}
                                    >There Are No Available Mentors</h3>
                                )}

                            <div className='add-mentor'>
                                {!this.state.userData.isMentor ? (
                                    <Link to='/addMentor'>
                                        Become a Mentor
                                    </Link>
                                ) : (<span />)}
                            </div>
                        </div>

                        {this.state.mentors.length > 0 || this.state.selected != null ? (
                            <div className='search-page-details'>
                                <h1
                                    style={{ paddingBottom: 20 }}
                                > Selected Mentor</h1>
                                <MentorProfile
                                    uid={this.state.selected}
                                    deleteMentor={this.deleteMentor}
                                />
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
