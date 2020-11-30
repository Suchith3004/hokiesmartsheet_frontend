import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import MentorItem from "./MentorItem";
import List from 'react-list-select';
import MentorProfile from "./MentorProfile";

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
            mentors: [],
            mentorsR: [],
            selected: "",

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
                    mentors: data
                });

                this.state.mentorsR = data.map((item, index) => {
                    return (
                        <MentorItem
                            uid = {item.userId}
                        >
                        </MentorItem>
                    );
                });

                this.state.selected = data[0].userId
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
                <List
                    items={ this.state.mentorsR}
                    selected={[0]}
                    disabled={[4]}
                    multiple={false}
                    onChange={(selected) => { this.state.selected = this.state.mentors[selected].userId
                                                   console.log(this.state.selected)
                                                }}
                />
                <MentorProfile
                    key =  {this.state.selected}
                />
            </div>
        );
    }

}

export default MentorList;
