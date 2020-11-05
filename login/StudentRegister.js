import React, { Component } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

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
class StudentRegister extends Component {
    constructor(props) {
        super(props);

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

        function getAPClasses() {
            var str = "", i;
            for (i = 0; i < asa.cars.options.length; i++) {
                if (asa.cars.options[i].selected) {
                    str += asa.cars.options[i].value + ",";
                }
            }
            if (str.charAt(str.length - 1) == ',') {
                str = str.substr(0, str.length - 1);
            }


            alert("Options selected are " + str);

        }


        return (

            <form action="/">
                <button style={{ borderRadius: 10, width: 100, boxShadow: 10, padding: 10, position:"relative", left:-250, top:-100 }} onClick={this.courseEdit}>Back</button>

                <label style={{ fontSize: 60, padding: -40 }}>Student Registration</label>
                <Container>


                    <div className="info">
                        <roundedInput><input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="fname" type="text" name="name" placeholder="First name" /></roundedInput>
                        <div><input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="mname" type="text" name="name" placeholder="Middle name" /></div>
                        <div>  <input className="lname" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Last name" /></div>
                        <div>   <input className="pid" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Student PID" /></div>
                        <div>   <input className="gradyear" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="Graduation Year" /></div>
                        <div>   <input type="text" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} name="name" placeholder="Phone number" /></div>


                        <div>  <label htmlFor="majors">Choose a major:</label></div>
                        <div>   <select style={{ borderRadius: 10, width: 300, padding: 10, boxShadow: 10 }} name="major" id="major">
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
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15 }} name="cars" id="combo" multiple>
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

                    </div>

                </Container>

            </form >






        );

    }

}
export default StudentRegister;