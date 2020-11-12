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
        <button onClick={handleClick} style={{ marginLeft: '25px', marginBottom:'20px',  borderRadius: 10, boxShadow: 10}} className="btn btn-success">Complete Student Registration</button>
    );
}

class ClassesReg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            apEquivalents: {},
            courseOptions: {}
        }

    }


    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllAPEquivalents",
            data: {}
        })
            .then( (response) =>{ 
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


    render() {
        // const { apSearchValue, setAPSearchValue } = useState('');
        // const { apSearchList, setAPSearchList } = useState();
        function filterAPClasses( apSearchValue ) {
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
                <label style={{ fontSize: 60, padding: -40 }}>Student Registration</label>
                <Container>
                    {/* <div> 
                        <SearchBar filterSearchChange={filterAPClasses} defaultOptions={cleanDefaultOptions}/>   
                    </div> */}
                    <div className="info">                        

                        <div>   <label htmlFor="numClasses">How many college level classes have you taken? List them below in the following format: EDCI-577</label></div>
                        <div>   <input type="text" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} name="numClasses" id="numClasses" placeholder="Number of Classes" onChange={this.numTextFields.bind(this)} /></div>
                        <form id="textfields">
                            <input type="text" id="textfields" ></input>
                        </form>


                        <br></br>


                        <div>  <label htmlFor="apclasses">Select all the AP Classes:</label></div>
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15, height:200}} name="cars" id="combo" multiple>
                            <option value="CSa">Computer Science A</option>
                            <option value="micro">Microeconomics</option>
                            <option value="macro">Macroeconomics</option>
                            <option value="engLangComp">English - Language/Composition</option>
                            <option value="engLitComp">English - Literature/Composition</option>
                            <option value="hist">U.S. History</option>
                            <option value="calcab">Calculus AB</option>
                            <option value="calcbc">Calculus BC</option>
                            <option value="phy1">Physics 1: Algebra-Based</option>
                            <option value="phy2">Physics 2: Algebra-Based</option>
                            <option value="phyc">Physics C - Mechanics</option>
                            <option value="govpol">U.S. Government & Politics</option>
                            <option value="compgov">Comparative Government & Politics</option>
                        </select>
                        <input type="button" onClick="getAPClasses()"></input>
                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>


                        <div>  <label htmlFor="minors">Who is your advisor?</label></div>
                        <div>  <select style={{ borderRadius: 10, width: 300, padding: 10, boxShadow: 10}} name="minor" id="minor">
                            <option value="Select">--Select--</option>
                            <option value="Tonisha Montgomery">Tonisha Montgomery</option>
                            <option value="Leigh Anne Byrd">Leigh Anne Byrd</option>
                            <option value="Jennifer Bradley">Jennifer Bradley</option>
                            <option value="Ruth Labbe Haley">Ruth Labbe Hale</option>
                            <option value="Ryan Underwood">Ryan Underwood</option>


                        </select>
                        </div>

                        <br></br>
                        <br></br>
                        <br></br>

                        <SubmitButton/>
                    </div>

                </Container>

            </form >






        );

    }

}
export default ClassesReg;