import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import fire from "../login/config/Fire";
import Logo from './logo_transparent.png';
import NavBar from '../utilities/NavBar'
import {cos} from "react-native-reanimated";
import Button from "@material-ui/core/Button";

const Container = styled.div`
    background-color:white;
    width:600px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

const FieldsContainer = styled.div`
    background-color:white;
    width:400px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    padding : 10px;
`;

class MentorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            isLoaded: false,
            error: null,
            mentor: {},
        }
    }git

    componentDidMount() {
        this.state.uid = this.props.uid

        dbFetch.get({
            endpoint: "/getUser/" + this.state.uid,
            data: {}
        })
            .then(response => response.json())
            .then((data) => {

                this.setState({
                    isLoaded: true,
                    mentor: data
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
        return (
            <div>
                <Container>
                    <img
                        src={Logo}
                        alt="new"
                        style={{ borderRadius: 200, height: 170, width: 170, boxShadow: 10, padding: 10 }}
                    />
                    {console.log(this.state)}

                    <h2
                        style={{ margin: 20 }}>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
                    <FieldsContainer>
                        <h5>{"Occupation: " + this.state.mentor.occupation}</h5>
                        <h5>{"Organization: " + this.state.mentor.organizationName}</h5>
                        <h5>{"Alumni: " + this.state.mentor.alumni}</h5>
                        <h5>{"My Bio: " + this.state.mentor.description}</h5>
                        <h5>{"My Interests: " + this.state.mentor.description}</h5>
                        <h5>{"My Hobbies: " + this.state.mentor.description}</h5>
                        <h5>{"My Qualities: " + this.state.mentor.description}</h5>
                    </FieldsContainer>
                    <Button onClick={() => {alert('Your Request Has Been Submitted') }}
                            variant="contained" size = "Large" style={{margin : "20px", backgroundColor: "#1fd127"}}>
                        Request Help
                    </Button>
                </Container>
            </div>
        );
    }

}

export default MentorProfile;
