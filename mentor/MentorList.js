import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import List from '../utilities/List'
import MentorProfile from "./MentorProfile";
import NavBar from "../utilities/NavBar";

const Container = styled.div`
    display: flex;
    margin:0 auto;
`;

const Container2 = styled.div`
    background-color:white;
    width : 40%;
    margin : 20px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    padding-right : 40px;
`;

const Container3 = styled.div`
    background-color:white;
    margin : 40px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    padding : 40px;
`;

const Cont = styled.div`
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

    handleClick = (e) =>{
        this.setState({
            selected: e.userId,
        })
    }

    mentorItem(mentor) {
        return <Cont>
                <FieldsContainer1>
                    <img
                        src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                        alt="new"
                        style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 5 }}
                    />
                </FieldsContainer1>
                <FieldsContainer2>
                    <h2
                        style={{margin: 5}}>{mentor.name }</h2>
                    <h5>{"Occupation: " + mentor.occupation}</h5>
                    <h5>{"Organization: " + mentor.organizationName}</h5>
                </FieldsContainer2>
            </Cont>
    }

    render() {
        return (
           <div>
                <NavBar current="mentorSearch" />
            <Container>
                <Container2>
                    <h1
                        style = {{padding : 15}}
                    > Available Mentors</h1>
                    <List elements={this.state.mentors}
                          getListElem={this.mentorItem}
                          handleClick = {this.handleClick}/>
                </Container2>
                <Container3>
                    <h1
                        style = {{paddingBottom : 20}}
                    > Selected Mentor</h1>
                    <MentorProfile
                    uid =  "ScC1yLxp24WhitlyiY2UVhvOXWm1"//{this.state.selected}
                    />
                </Container3>
            </Container>
           </div>
        );
    }
}

export default MentorList;
