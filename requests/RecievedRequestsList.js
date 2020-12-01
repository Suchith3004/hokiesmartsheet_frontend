import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import List from 'react-list-select';
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import SentRequestsItem from "./SentRequestsItem";

const Container = styled.div`
    display: flex;
    margin:0 auto;
`;

const Container2 = styled.div`
    width : 40%;
    margin : 20px;
`;

const Container3 = styled.div`
    margin : 40px;
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
            requestsR: this.props.userData.mentorRequests.map((item) => {
                return (
                    <SentRequestsItem
                        uid = {item.userId}
                    >
                    </SentRequestsItem>
                );
            }),
        });
    }


    render() {
        return (
            <div>
                <NavBar current="mentorSearch" />
                <Container>
                    <Container2>
                        <List
                            items={this.state.requestsR}
                        />
                    </Container2>
                </Container>
            </div>
        );
    }
}

export default RecievedRequestsList;
