import React, { Component, useState } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { useHistory } from 'react-router-dom';


const Container = styled.div`
padding:20px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`;


function SubmitButton(props) {

    let history = useHistory();
    function handleClick() {
        history.push('/createUser');
    }

    return (
        <button onClick={handleClick} style={{ marginLeft: '25px', marginBottom:'20px'}} className="btn btn-success">Create Account</button>
    );
}

class StudentRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            apEquivalents: {},
            transferCourseOptions: {},
            selectedApClasses :[],
            selectedTransferClasses : [],
        }

    }


    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllAPEquivalents",
            data: {}
        })
            .then(response => response.json())
            .then((data) => {

                for (var i = 0; i < data.length; i++) {
                    data[i].label = "AP Class: " + data[i].apName + ",      " + "AP Score: " +  data[i].apScore + ",     " + "VT Class: " + data[i].vtCourseId;
                    data[i].value = "AP Class: " + data[i].apName + ",      " + "AP Score: " +  data[i].apScore + ",     " + "VT Class: " + data[i].vtCourseId;
                }

                this.setState({
                    isLoaded: true,
                    apEquivalents: data
                });

            })
            .catch((error) => {
                console.error("Failed to fetch APEquivalents: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });


        dbFetch.get({
            endpoint: "/getDefaultChecksheet",
            data: { major: "CS", gradYear: 2022 },
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)

                this.setState({
                    isLoaded: true,
                    transferCourseOptions: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch Default Checksheet. " + error.message);
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


    render() {

        function customTheme(theme){
            return {
                ...theme,
                colors:{
                    ...theme.colors,
                    primary25: 'orange',
                    primary : 'green',
                }
            }
        }
        return (

            <form action="/">
                <label style={{ fontSize: 60, padding: -40 }}>Student Registration</label>
                <Container>
                    <div className="info">
                        <roundedInput><input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="fname" type="text" name="name" placeholder="First name" /></roundedInput>
                        <div>  <input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="mname" type="text" name="name" placeholder="Middle name" /></div>
                        <div>  <input className="lname" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Last name" /></div>
                        <div>  <input className="gradyear" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Graduation Year" /></div>

                        <div>  <label htmlFor="majors">Choose a major:</label></div>
                        <div>  <select style={{ borderRadius: 10, width: 300, padding: 10, boxShadow: 10 }} name="major" id="major">
                            <option value="Computer Science">Computer Science</option>
                            <option value="Computer Engineering">Computer Engineering</option>
                        </select>
                        </div>

                        <div>  <label htmlFor="minors">Choose a minor:</label></div>
                        <div>  <select style={{ borderRadius: 10, width: 300, padding: 10, boxShadow: 10 }} name="minor" id="minor">
                            <option value="None">None</option>
                            <option value="Mathematics">Mathematics</option>
                        </select>
                        </div>

                        <div>   <label htmlFor="numClasses">How many college level classes have you taken? List them below in the following format: EDCI-577</label></div>
                        <div>   <input type="text" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} name="numClasses" id="numClasses" placeholder="Number of Classes" onChange={this.numTextFields.bind(this)} /></div>
                        <form id="textfields">
                            <input type="text" id="textfields" ></input>
                        </form>



                        <div>  <label htmlFor="apclasses">Select all the AP Classes:</label></div>
                        <Select
                            theme = {customTheme}
                            options = {this.state.apEquivalents}
                            className = "APClasses"
                            placeholder = "Select All Taken AP Classes"
                            isMulti
                            autoFocus
                            isSearchable
                        />
                        <br></br>
                        <SubmitButton/>

                    </div>

                </Container>


            </form >


        );

    }

}
export default StudentRegister;
