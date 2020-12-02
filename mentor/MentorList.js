import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import List from '../utilities/List'
import MentorProfile from "./MentorProfile";
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import {motion} from "framer-motion";

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
    margin:0 auto;
`;

const Container2 = styled.div`
    background-color:white;
    width : 40%;
    margin : 20px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    padding-right : 40px;
    padding-bottom : 15px;
`;

const Container3 = styled.div`
    background-color:white;
    margin : 40px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    padding : 40px;
`;

const Cont = styled.div`
    width:100%;
    height: 150px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

const FieldsContainer1 = styled.div`
  background-color:white;
  width: 35%;
  height: 150px;
  float: left;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
   border-radius: 15px;
`;

const FieldsContainer2 = styled.div`
    background-color:white;
    height: 150px;
    margin-top: 10px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    padding : 10px;
    border-radius: 15px;
`;

class MentorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentors: [],
            selected: null,
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

    }

    deleteMentor = (uid) =>{
        this.setState({
            mentors: this.state.mentors.filter(function( obj ) {
                return obj.userId !== uid;
            }),
        })
    }

    handleClick = (e) =>{
        this.setState({
            selected: e.userId,
        })
    }

    mentorItem(mentor) {
        return <Cont>
            <FieldsContainer1>
                <img
                    src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                    alt="new"
                    style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 5 }}
                />
            </FieldsContainer1>
            <FieldsContainer2>
                <h2
                    style={{margin: 5}}>{mentor.name }</h2>
                <h5>{"Occupation: " + mentor.occupation}</h5>
                <h5>{"Organization: " + mentor.organizationName}</h5>
            </FieldsContainer2>
        </Cont>
    }

    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <motion.span
                style={circleStyle}
                animate={{rotate: 360}}
                transition={spinTransition}
            />
        } else {
            return (
                <div>
                    <NavBar current="mentorSearch"/>
                    <Container>
                        <Container2>
                            <h1
                                style={{padding: 15}}
                            > Available Mentors</h1>

                            {this.state.mentors.length > 0 ? (
                                <List elements={this.state.mentors}
                                      key = {0}
                                      getListElem={this.mentorItem}
                                      handleClick={this.handleClick}/>
                            ) : (
                                <h3
                                    style={{paddingBottom: 15}}
                                >There Are No Available Mentors</h3>
                            )}

                        </Container2>
                        {this.state.mentors.length > 0 || this.state.selected!= null ? (
                            <Container3>
                                <h1
                                    style={{paddingBottom: 20}}
                                > Selected Mentor</h1>
                                <MentorProfile
                                    uid= {this.state.selected}
                                    deleteMentor = {this.deleteMentor}
                                />
                            </Container3>
                        ) : (
                            <span/>
                        )}
                    </Container>
                </div>
            );
        }
    }
}

export default MentorList;
