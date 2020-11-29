import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import fire from "../login/config/Fire";
import Column from "../checksheet/Semester";
import MentorItem from "./MentorItem";

const Container = styled.div`
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    text-align: center;
`;


class MentorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentors: {},
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllMentors/",
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    isLoaded: true,
                    mentors: data
                });

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
            <Container>
                {self.state.mentors.map((mentor) => {
                    return <MentorItem uid = {mentor.uid} />
                })}
            </Container>
        );
    }

}

export default MentorList;
