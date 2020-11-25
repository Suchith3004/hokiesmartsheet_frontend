import React, { Component, useState } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'

import { useHistory } from 'react-router-dom';


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

function SubmitButton(props) {

    let history = useHistory();
    function handleClick() {
        history.push('/createUser');
    }

    return (
        <button onClick={handleClick} style={{ marginLeft: '25px', marginBottom: '20px', borderRadius: 10, boxShadow: 10 }} className="btn btn-success">Register As Student</button>
    );
}
function SubmitButtonMentor(props) {

    let history = useHistory();
    function handleClick() {
        history.push('/createUser');
    }

    return (
        <button onClick={handleClick} style={{ marginLeft: '25px', marginBottom: '20px', borderRadius: 10, boxShadow: 10 }} className="btn btn-success">Register As Mentor</button>
    );
}

class StudentRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            apEquivalents: [],
            courseOptions: {},
            test: "I hat ethis"
        }

    }


    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllAPEquivalents",
            data: {}
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    apEquivalents: data
                })
            })
            .catch((error) => {
                console.error("Failed to fetch apEquivalents. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }



    numTextFields(event) {
        /*Getting the number of text fields*/
        var no = document.getElementById('numClasses').value;
        // /*Generating text fields dynamically in the same form itself*/
        for (var i = 1; i < no; i++) {
            var textfield = document.createElement('input');
            textfield.type = "text";
            textfield.value = "";
            document.getElementById('textfields').appendChild(textfield);
        }
    }

    createUser() {
        dbFetch.get({
            endpoint: "/getAllAPEquivalents",
            data: {}
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    apEquivalents: data
                })
            })
            .catch((error) => {
                console.error("Failed to fetch apEquivalents. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });

    }


    render() {

        const cleanApEquivalents = (inputValue) => {
            if(!this.state) {
                return [];
            }

            const cleanedEquivalents = []
            this.state.apEquivalents.forEach(equivalent => {
                const name = equivalent.apName.toLowerCase().includes(inputValue.toLowerCase());
                const courseId = equivalent.vtCourseId.toLowerCase().includes(inputValue.toLowerCase());
                const courseName = equivalent.vtCourseName.toLowerCase().includes(inputValue.toLowerCase());

                if (!inputValue || inputValue === '' || name || courseId || courseName) {
                    cleanedEquivalents.push({
                        value: equivalent.equivalentId.toString(),
                        label: equivalent.apName + ' (' + equivalent.apScore + ') => ' + equivalent.vtCourseId + '-' + equivalent.vtCourseName
                    })
                }
            })
            return cleanedEquivalents;
        }


        return (

            <form action="/">
                <label style={{ fontSize: 60, padding: -40 }}>Registration</label>
                <Container>
                    <div> 
                        <SearchBar options={cleanApEquivalents}/>   
                    </div>
                    <div className="info">
                        <roundedInput><input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="fname" type="text" name="name" placeholder="First name" /></roundedInput>
                        <div>  <input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="mname" type="text" name="name" placeholder="Middle name" /></div>
                        <div>  <input className="lname" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Last name" /></div>
                        <div>  <input className="gradyear" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Graduation Year" /></div>
                        <br></br>

                        <div>  <label htmlFor="majors">Choose a major:</label></div>
                        <div>  <select style={{ borderRadius: 10, width: 300, padding: 10, boxShadow: 10 }} name="major" id="major">
                            <option value="Select">--Select--</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Computer Engineering">Computer Engineering</option>
                        </select>
                        </div>
                        <br></br>
                        <br></br>

                        <div>  <label htmlFor="minors">Choose a minor:</label></div>
                        <div>  <select style={{ borderRadius: 10, width: 300, padding: 10, boxShadow: 10 }} name="minor" id="minor">
                            <option value="Select">--Select--</option>
                            <option value="None">None</option>
                            <option value="Mathematics">Mathematics</option>
                        </select>
                        </div>

                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>

                        <label for="registeringAsStudent">Register as a Student</label>
                        <input type="checkbox" name="registeringAsStudent" checked={this.state.registeringAsStudent} onChange={this.handleInputChange} /><br />
                        <label for="registeringAsStudent">Register as a Mentor</label>
                        <input type="checkbox" name="registeringAsMentor" checked={this.state.registeringAsMentor} onChange={this.handleInputChange} />

                        {this.state.registeringAsStudent ? (
                            <ClassesReg />
                        ) : ( <span />)}

                        {this.state.registeringAsMentor ? (
                            <MentorRegister />
                        ) : ( <span />)}

                        {this.state.registeringAsStudent || this.state.registeringAsMentor ? (
                            <SubmitButton />
                        ) : ( <span />)}

                    </div>

                </Container>

            </form >

        );

    }

}
export default StudentRegister;