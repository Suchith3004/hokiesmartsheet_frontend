import React, { Component, useState } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'



const Container = styled.div`
padding:20px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`;
const roundedInput = styled.div`
padding:10px;
border-radius:10px;
border-top-left-radius: 25px;
`;

const qualities = ["Enthusiastic",
    "A Respectful Attitude",
    "Eagerness to Invest in Others",
    "Good Listener",
    "The Ability to Give Honest and Direct Feedback",
    "Creative", "Reflective Listening and Empathy",
    "Positive",
    "Availability to devote time & Spiritual Groups",
    "Positive outlook",
    "Resilience and adaptability"];

const clubs = ["Academic Clubs",
    "Political Clubs",
    "Media & Publication Groups",
    "Community Service & Social Justice",
    "Theater & The Arts",
    "Cultural Clubs",
    "Religious & Spiritual Groups",
    "Sports & Recreation",
    "Greek",
    "Student government",
    "Entrepreneurship Club",
    "Dance"];

const interests = ["To become a better leader",
    "Achieve personal career gains",
    "Shape the leaders of tomorrow",
    "Gain new perspectives and fresh ideas",
    "Change someone’s world",
    "Exercise emotional intelligence",
    "Improve productivity",
    "Feel good about yourself",
    "Resume boost"];

const hobbies = ["Photography",
    "Reading",
    "Gardening",
    "Cooking",
    "Dance",
    "Painting",
    "Travel",
    "Hiking",
    "Writing",
    "Music",
    "Cycling",
    "Baking",
    "Bird",
    "Fishing",
    "Scrapbooking",
    "Drawing",
    "Singing",
    "Sewing",
    "Running",
    "Knitting",
    "Camping",
    "Origami",
    "Volunteering"
]


class MentorRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organizations: [],
            chosenOrganization: null,
            qualities: [],
            hobbies: [],
            interests: [],
            clubs: [],
            alumni: null,
            occupation: null,
            description: null
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllOrganizations",
            data: {}
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {

                const orgs = []
                data.forEach(org => {
                    orgs.push({
                        value: org.id,
                        label: org.name
                    })
                })

                this.setState({
                    isLoaded: true,
                    organizations: orgs
                })
            })
            .catch((error) => {
                console.error("Failed to fetch apEquivalents. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            })


    }

    componentDidUpdate(prevProps) {
        if (this.props.submitted != prevProps.submitted && this.props.submitted != false) {
            if (!this.state.chosenOrganization || !this.state.description) {
                console.log()
                this.props.submit(null, 'mentor');
            }
            else {
                const newMentor = {
                    occupation: this.state.occupation,
                    organizationId: this.state.chosenOrganization,
                    description: this.state.description,
                    occupation: this.state.occupation ? this.state.occupation : 'VT Student',
                    qualities: this.state.qualities,
                    hobbies: this.state.hobbies,
                    clubs: this.state.clubs,
                    mentorInterests: this.state.interests,
                    alumni: this.state.alumni
                }
                console.log(newMentor);
                this.props.submit(newMentor, 'mentor');
            }
        }
    }

    render() {

        const cleanChosenHobbies = (inputValue) => {
            const options = [];
            hobbies.forEach(hobby => options.push({
                value: hobby,
                label: hobby
            }));
            return options;
        }

        const handleChosenHobbies = (e) => {
            if (!e)
                return
            const chosenHobbies = [];

            e.forEach(item => chosenHobbies.push(item.value));

            this.state.hobbies = chosenHobbies;
        }

        const handleChosenQualities = (e) => {
            if (!e)
                return
            const chosenQualities = [];

            e.forEach(item => chosenQualities.push(item.value));

            this.state.qualities = chosenQualities;
        }

        const cleanChosenQualities = (inputValue) => {
            const options = [];
            qualities.forEach(quality => options.push({
                value: quality,
                label: quality
            }));
            return options;
        }

        const handleChosenClubs = (e) => {
            if (!e)
                return
            const chosenClubs = [];

            e.forEach(item => chosenClubs.push(item.value));

            this.state.clubs = chosenClubs;
        }

        const cleanChosenClubs = (inputValue) => {
            const options = [];
            clubs.forEach(club => options.push({
                value: club,
                label: club
            }));
            return options;
        }

        const handleChosenInterests = (e) => {
            if (!e)
                return
            const chosenInterests = [];

            e.forEach(item => chosenInterests.push(item.value));

            this.state.interests = chosenInterests;
        }

        const cleanChosenInterests = (inputValue) => {
            const options = [];
            interests.forEach(interest => options.push({
                value: interest,
                label: interest
            }));
            return options;
        } 

        return (
            <form action="/">
                <label style={{ fontSize: 30, padding: -40 }}><u>Mentor Registration</u></label>
                <Container>
                    <div className="info">

                        <div>
                            <label style={{ fontSize: 20, paddingRight: 10 }}>Occupation:  </label>
                            <input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} onChange={(e) => { this.setState({ occupation: e.target.value }) }} placeholder="(Leave blank if N/A)" />
                        </div>
                        <br></br>
                        <br></br>

                        <div>  <label style={{ fontSize: 17 }}>What organization are you mentoring for?</label></div>
                        <div> <SearchBar multiSelect={false} options={(inputValue) => { return this.state ? this.state.organizations : [] }} handleChange={(e) => this.state.chosenOrganization = e ? e.value : null} /> </div>
                        <br></br>

                        <div>  <label style={{ fontSize: 17 }}>Select the qualities you posses for a good mentor</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanChosenQualities} handleChange={handleChosenQualities} /> </div>
                        <br></br>

                        <div>  <label style={{ fontSize: 17 }}>Select your hobbies/interests</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanChosenHobbies} handleChange={handleChosenHobbies} /> </div>
                        <br></br>

                        {this.props.student ? (
                            <div>  <label style={{ fontSize: 17 }}>Select the clubs/organizations you are involved in</label><br></br>
                                <SearchBar multiSelect={true} options={cleanChosenClubs} handleChange={handleChosenClubs} />
                                <br></br></div>
                        ) : (<span />)}

                        <div>  <label style={{ fontSize: 17 }}> Select why you are interested in becoming a mentor</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanChosenInterests} handleChange={handleChosenInterests} /> </div>
                        <br></br>

                        <div>  <label style={{ fontSize: 17 }}>Please provide a brief description of yourself and your background to help mentees find you:</label></div>
                        <div>  <textarea style={{ borderRadius: 10, boxShadow: 10, padding: 10 }} onChange={(e) => this.setState({ description: e.target.value })} rows="5" cols="80" placeholder='Write your description here...'></textarea></div>
                        <br></br>

                        {!this.props.student ? (
                            <div>
                                <div>  <label style={{ fontSize: 17 }}>Where did you graduate from?</label></div>
                                <roundedInput><input style={{ borderRadius: 10, width: 400, boxShadow: 10, padding: 10 }} onChange={(e) => this.setState({ alumni: e.target.value })} placeholder="Enter college/university here.." /></roundedInput>
                                <br></br>
                            </div>
                        ) : (<span />)}

                        <br></br>
                        <br></br>

                    </div>

                </Container>

            </form >

        );

    }

}

export default MentorRegister;