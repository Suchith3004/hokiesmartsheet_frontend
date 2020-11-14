import React, { Component, useState } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import ClassesReg from "./ClassesReg";
import MentorRegister from "./MentorRegister";
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
            registeringAsStudent: false,
            registeringAsMentor: false,
            isLoaded: false,
            error: null,
            apEquivalents: {},
            courseOptions: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }


    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllAPEquivalents",
            data: {}
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                console.log(data);
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
        // console.log("hello");
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
    }

    render() {
        // const { apSearchValue, setAPSearchValue } = useState('');
        // const { apSearchList, setAPSearchList } = useState();
        function filterAPClasses(apSearchValue) {
            const filteredResults = this.state.apEquivalents.filter(equivalent => {
                return equivalent.apName.toLowerCase().includes(apSearchValue.toLowerCase());
            });

            const cleanedResults = filteredResults.map(equivalent => {
                return equivalent.apName + ' (' + equivalent.apScore + ') => ' + equivalent.vtCourseName;
            })

            return cleanedResults;

            // setAPSearchList(cleanedResults);
        }


        // function getAPClasses() {
        //     var str = "", i;
        //     for (i = 0; i < asa.cars.options.length; i++) {
        //         if (asa.cars.options[i].selected) {
        //             str += asa.cars.options[i].value + ",";
        //         }
        //     }
        //     if (str.charAt(str.length - 1) == ',') {
        //         str = str.substr(0, str.length - 1);
        //     }


        //     alert("Options selected are " + str);

        // }
        function cleanDefaultOptions() {
            return this.state.apEquivalents.map(equivalent => {
                return equivalent.apName + ' (' + equivalent.apScore + ') => ' + equivalent.vtCourseName;
            })
        }

        return (

            <form action="/">
                <label style={{ fontSize: 60, padding: -40 }}>Registration</label>
                <Container>
                    {/* <div> 
                        <SearchBar filterSearchChange={filterAPClasses} defaultOptions={cleanDefaultOptions}/>   
                    </div> */}
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

                        <input type="checkbox" name="registeringAsStudent" checked={this.state.registeringAsStudent} onChange={this.handleInputChange} />
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