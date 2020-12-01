import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import fire from "../login/config/Fire";
import Logo from '../utilities/logo_transparent_2.png';
import Button from "@material-ui/core/Button";


const Container = styled.div`
    background-color:white;
    width:600px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
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

class MentorProfile extends Component {
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
            endpoint: "/getUser/" + this.props.uid,
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

    sendMentorRequest(){
        let menteeUid = fire.auth().currentUser.uid;
        let mentorUid = this.props.uid;
        
        dbFetch.post({
            endpoint: "/sendMenteeRequest",
            data: {
                menteeId : menteeUid,
                mentorId : mentorUid,
            }
        })
            .then((response) => response.json())
            .catch((error) => {
                alert("Failed to send mentor request! " + error.message);
                this.setState({
                    isLoaded: true,
                    error,
                    submitted: false
                });
            });
    }
    getString(array){
        console.log(array)
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
        return (
            <div>
                <Container>
                    <img
                        src={Logo}
                        alt="new"
                        style={{ borderRadius: 200, height: 120, width: 170, boxShadow: 10, padding : 5, }}
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
                    <Button onClick={() => {
                        this.sendMentorRequest()
                        alert('Your Request Has Been Submitted')
                    }}
                            variant="contained" size = "large" style={{margin : "20px", backgroundColor: "#1fd127"}}>
                        Request Help
                    </Button>
                </Container>
            </div>
        );
    }
}

export default MentorProfile;
