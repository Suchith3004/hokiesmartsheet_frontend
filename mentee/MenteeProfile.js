import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import fire from "../login/config/Fire";

const Container = styled.div`
    width:600px;
    height: 400px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    text-align: center;
`;

const FieldsContainer = styled.div`
    width:400px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    text-align: center;
    width: 50%;
    margin: 0 auto;
    padding : 10px
`;

class MenteeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentee: {},
        }
    }

    componentDidMount() {
        let uid = (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid)
        dbFetch.get({
            endpoint: "/getUserChecksheet/" + uid,
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    isLoaded: true,
                    mentee: data
                });

            })
            .catch((error) => {
                console.error("Failed to fetch mentee data: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });


    }

    render() {
        return (
            <Container>
                <img
                    src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                    alt="new"
                    style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 10 }}
                />
                <h2
                    style={{margin: 20}}>{this.state.mentee.firstName + " " + this.state.mentee.lastName}</h2>
                <FieldsContainer>
                    <h5>{"School: " + this.state.mentee.school}</h5>
                    <h5>{"Major: " + this.state.mentee.major}</h5>
                    <h5>{"Year: " + this.state.mentee.year}</h5>
                </FieldsContainer>
            </Container>
        );
    }

}

export default MenteeProfile;
