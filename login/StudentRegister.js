import React, { Component, useState } from 'react';
import styled from "styled-components";
import dbFetch from '../api/dbFetch'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';
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
    }

    fetchTransferClassesData = (inputValue, callback) => {
        dbFetch.get({
            endpoint: "/autocompleteCourseName/" + inputValue,
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                for (var i = 0; i < data.length; i++) {
                    data[i].label = data[i].category + " " +   data[i].number + ": " + data[i].name;
                    data[i].value = data[i].category + " " +   data[i].number + ": " + data[i].name;

                }
                this.setState({
                    isLoaded: true,
                    transferCourseOptions: data
                });

                callback(this.state.transferCourseOptions)
            })
            .catch((error) => {
                console.error("Failed to get auto complete courses: " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
        return this.state.transferCourseOptions
    }

    onAPChange = (selectedOptions) => {

    };
    onTransferChange = (selectedOptions) => {

    };

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
                        <div>  <label htmlFor="apclasses">Select all the AP Classes:</label></div>
                        <Select
                            theme = {customTheme}
                            options = {this.state.apEquivalents}
                            className = "APClasses"
                            placeholder = "Select All Taken AP Classes"
                            isMulti
                            autoFocus
                            isSearchable
                            onChange={(e) => {this.onAPChange(e);}}
                        />

                        <div>  <label htmlFor="apclasses">Select all the Transfer Classes:</label></div>
                        <AsyncSelect
                            theme = {customTheme}
                            className = "APClasses"
                            placeholder = "Select All Taken Transfer Classes"
                            isMulti
                            autoFocus
                            isSearchable
                            cacheOptions
                            loadOptions={this.fetchTransferClassesData}
                            onChange={(e) => {this.onTransferChange(e);}}
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
