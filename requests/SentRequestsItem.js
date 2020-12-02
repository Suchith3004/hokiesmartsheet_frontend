import React, { Component } from 'react';
import styled from "styled-components";
import dbFetch from "../api/dbFetch";
import {motion} from "framer-motion";
import Button from "@material-ui/core/Button";

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

const Container = styled.div`
    width:100%;
    background-color:white;
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

class SentRequestsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            userData: {},
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getUser/" + this.props.uid,
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

    render() {
        const { isLoaded } = this.state;
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
                <Container>
                    <FieldsContainer1>
                        <img
                            src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                            alt="new"
                            style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 5 }}
                        />
                    </FieldsContainer1>
                    <FieldsContainer2>
                        <h2
                            style={{margin: 5}}>{this.state.userData.firstName + " " + this.state.userData.lastName  }</h2>
                        <h5>{"Occupation: " + this.state.userData.occupation}</h5>
                        <h5>{"Organization: " + this.state.userData.organizationName}</h5>
                    </FieldsContainer2>
                </Container>
            );
        }
    }
}

export default SentRequestsItem;
