import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import MentorItem from "./MentorItem";
import List from 'react-list-select';
import MentorProfile from "./MentorProfile";
import NavBar from "../utilities/NavBar";

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
            mentorsR: [],
            selected: null,
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllMentors/",
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    mentors: data,
                    mentorsR : data.map((item) => {
                        return (
                            <MentorItem
                                uid = {item.userId}
                                name = {item.name}
                                occupation = {item.occupation}
                                organizationName = {item.organizationName}
                            >
                            </MentorItem>
                        );
                    }),
                });
                if(data.length >0) {
                    this.setState({
                        selected: data[0].userId,
                    });
                }
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
        return (
           <div>
                <NavBar current="mentorSearch" />
            <Container>
                <Container2>
                <List
                    items={ this.state.mentorsR}
                    selected={[0]}
                    multiple={false}
                    onChange={(selected) => {
                        this.setState({
                            selected: this.state.mentors[selected].userId,
                        })
                    }}
                />
                </Container2>
                <Container3>
                <MentorProfile
                    //uid =  {this.state.selected}
                    uid = {"ScC1yLxp24WhitlyiY2UVhvOXWm1"}
                />
                </Container3>
            </Container>
           </div>
        );
    }

}

export default MentorList;
