import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import List from 'react-list-select';
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import SentRequestsItem from "./SentRequestsItem";
import RecievedRequestsItem from "./RecievedRequestsItem";

const Container = styled.div`
    width : 50%;
    margin : 20px;
    background-color:white;
    padding : 50px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

class SentRequestsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            userData: null,
            requestsR : [],
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
            userData: this.props.userData,
            requestsR:
                Object.keys(this.props.userData.mentorRequests).map(function(key) {
                    return (
                        <SentRequestsItem
                            uid = {key}
                        >
                        </SentRequestsItem>
                    );
                })
        });
    }


    render() {
        if (this.state.requestsR.length == 0) {
            return (
                <div>
                    <Container>
                        <h1
                            style = {{paddingBottom : 15}}
                        > Student Requests</h1>
                        <h3
                            style = {{paddingBottom : 15}}
                        >You Have Not Sent Any Mentor Requests</h3>
                    </Container>
                </div>
            )
        }
        return (
            <div>
                <Container>
                    <h1
                        style = {{paddingBottom : 15}}
                    > Mentor Requests</h1>
                    <List
                        items={this.state.requestsR}
                    />
                </Container>
            </div>
        );
    }
}

export default SentRequestsList;
