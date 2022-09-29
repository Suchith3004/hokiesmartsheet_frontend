import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import { View } from 'react-native';
import UserCard from "./UserCard";

import {Widget, addResponseMessage, addLinkSnippet, addUserMessage, toggleWidget, setQuickButtons} from 'react-chat-widget';

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

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            connections: [],
            selected: null,

        }
    }

    componentDidMount() {
        dbFetch.post({
            endpoint: "/getAllUserConnections/",
            data: {
                userId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid)
            }
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    connections: data
                });

                console.log(data);

            })
            .catch((error) => {
                console.error("Failed to fetch all connections data: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }


    render() {
        //{console.log((this.state.mentors[this.state.selected]).userId)}
        return (
           <div>
            <NavBar current="chat" />
            <Container>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <>
                        {this.state.connections.map(user => (
                                <UserCard otherUserData={user}/>
                            )
                        )}
                    </>
                </View>
            </Container>
           </div>
        );
    }

}

export default ChatPage;
