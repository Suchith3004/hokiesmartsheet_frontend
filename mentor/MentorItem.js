import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";


const Container = styled.div`
    width:100%;
    height: 150px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

const FieldsContainer1 = styled.div`
  background-color:white;
  width: 35%;
  height: 150px;
  float: left;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
   border-radius: 15px;
`;

const FieldsContainer2 = styled.div`
    background-color:white;
    height: 150px;
    margin-top: 10px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    padding : 10px;
    border-radius: 15px;
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

                </FieldsContainer1>
                <FieldsContainer2>
                    <h2
                        style={{margin: 5}}>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
                    <h5>{"Occupation: " + this.state.mentor.occupation}</h5>
                    <h5>{"Organization: " + this.state.mentor.organizationName}</h5>
                </FieldsContainer2>

            </Container>
        );
    }

}

export default MentorItem;
