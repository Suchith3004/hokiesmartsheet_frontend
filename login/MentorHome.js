import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import fire from "../login/config/Fire";
import Logo from '../utilities/logo_transparent_2.png';
import Button from "@material-ui/core/Button";
import { motion } from 'framer-motion'


const Container = styled.div`
    background-color:white;
    margin-left : 25%;
    margin-right : 25%;
    margin-top : 5%;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    text-color: black;
    padding: 10px;
`;

const FieldsContainer = styled.div`
    background-color:white;
    width:400px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    padding : 5px;
    margin-top: 7px;
`;
const circleStyle = {
    display: 'block',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    boxSizing: 'border-box',
    top: 0,
    left: 0
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}

class MentorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentor: {},
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getUser/" +  (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    mentor: data,
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

    getString(array){
        if(array != null) {
            let i;
            let string = "";
            for (i = 0; i< array.length; i++){
                if(i === array.length-1){
                    string = string + array[i]
                }else {
                    string = string + array[i] + ", "
                }
            }
            return string
        }
        return "Not Rendered"
    }

    render() {
        const {isLoaded } = this.state;
        if (!isLoaded) {
            return <div>
                <motion.span
                    style={circleStyle}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                />
            </div>
        }
        else {
            return (
                <div>
                    <Container>
                        <img
                            src={Logo}
                            alt="new"
                            style={{ borderRadius: 200, height: 150, width: 200, boxShadow: 10, padding : 5, }}
                        />
                        <FieldsContainer>
                            <h2>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"Occupation: "}</h5>
                            <h5>{this.state.mentor.occupation}</h5>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"Organization: "}</h5>
                            <h5>{this.state.mentor.organizationName}</h5>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"Alumni: "}</h5>
                            <h5>{this.state.mentor.alumni}</h5>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"My Bio: "}</h5>
                            <h5>{this.state.mentor.description}</h5>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"My Interests: "}</h5>
                            <h5>{this.getString(this.state.mentor.mentorInterests)}</h5>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"My Hobbies: "}</h5>
                            <h5>{this.getString(this.state.mentor.hobbies)}</h5>
                        </FieldsContainer>
                        <FieldsContainer>
                            <h5>{"My Qualities: "}</h5>
                            <h5>{this.getString(this.state.mentor.qualities)}</h5>
                        </FieldsContainer>
                    </Container>
                </div>
            );
        }

    }
}

export default MentorHome;
