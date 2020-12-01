import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import NavBar from "../utilities/NavBar";
import fire from "../login/config/Fire";
import { View } from 'react-native';
import UserCard from "./UserCard";

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

class MentorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentors: [],
            mentees: [],
            combo: [],
            selected: null,

        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllUserMentors/",
            data: {
                userId: fire.auth().currentUser.uid
            }
        })
            .then(response => response.json())
            .then((data) => {
                data.forEach((datum) => datum.isMyMentor = true);
                this.setState({
                    mentors: data
                });

                dbFetch.get({
                    endpoint: "/getAllUserMentees/",
                    data: {
                        userId: fire.auth().currentUser.uid
                    }
                })
                    .then(response => response.json())
                    .then((data) => {
                        data.forEach((datum) => datum.isMyMentor = false);
                        this.setState({
                            isLoaded: true,
                            mentees: data,
                            combo: mentors.concat(mentees)
                        });                        
                    })
            })
            .catch((error) => {
                console.error("Failed to fetch all mentors data: " + error.message);
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
                        {this.state.combo.map(user => (
                        user.isMyMentor ? (
                                <UserCard userData={user} mentor={user} student={fire.auth().currentUser} />
                            ) : (
                                <UserCard userData={user} mentor={fire.auth().currentUser} student={user} />
                                )

                        ))}
                    </>
                </View>
            </Container>
           </div>
        );
    }

}

export default MentorList;
