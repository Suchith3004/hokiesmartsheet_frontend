import React, { Component } from 'react';
import styled from "styled-components";
import List from 'react-list-select';
import RecievedRequestsItem from "./RecievedRequestsItem";

const Container = styled.div`
    margin-left : 25%;
    margin-right : 25%;
    margin-top : 5%;
    background-color:white;
    padding : 25px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

class RecievedRequestsList extends Component {
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
                Object.keys(this.props.userData.requests).map(function(key) {
                    return (
                        <RecievedRequestsItem
                            uid = {key}
                        >
                        </RecievedRequestsItem>
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
                        >You Have No New Student Requests</h3>
                    </Container>
                </div>
            )
        }
        return (
            <div>
                    <Container>
                        <h1
                            style = {{paddingBottom : 15}}
                        > Student Requests</h1>
                        <List
                            items={this.state.requestsR}
                        />
                    </Container>
            </div>
        );
    }
}

export default RecievedRequestsList;
