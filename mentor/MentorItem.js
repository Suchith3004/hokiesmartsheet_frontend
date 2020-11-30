import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";


const Container = styled.div`
    width:65%;
    height: 200px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`;

const FieldsContainer1 = styled.div`
  width: 25%;
  height: 190px;
  float: left;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`;

const FieldsContainer2 = styled.div`
    margin-top: 75px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    padding : 10px
`;

class MentorItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            mentor: {},
        }
    }

    componentDidMount() {
        let uid = this.props.uid
        dbFetch.get({
            endpoint: "/getUser/" + uid,
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

    render() {
        return (
            <Container>

                <FieldsContainer1>
                    <img
                        src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                        alt="new"
                        style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 5 }}
                    />
                    <h2
                        style={{margin: 5}}>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
                </FieldsContainer1>
                <FieldsContainer2>
                    <h5>{"Occupation: " + this.state.mentor.occupation}</h5>
                    <h5>{"Organization: " + this.state.mentor.organizationName}</h5>
                </FieldsContainer2>

            </Container>
        );
    }

}

export default MentorItem;
