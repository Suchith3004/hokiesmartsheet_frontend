import React, { Component } from 'react';
import fire from './config/Fire';

class StudentRegister extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <body>
            <form action="/">
                <h1>Student Registration</h1>
                <div className="info">
                    <input className="fname" type="text" name="name" placeholder="First name"/>
                    <input className="mname" type="text" name="name" placeholder="Middle name"/>
                    <input className="lname" type="text" name="name" placeholder="Last name"/>
                    <input className="pid" type="text" name="name" placeholder="Student PID"/>
                    <input className="gradyear" type="text" name="name" placeholder="Graduation Year"/>
                    <input type="text" name="name" placeholder="Phone number"/>
                    <label htmlFor="majors">Choose a major:</label>
                    <select name="major" id="major">
                        <option value="Computer Science">Computer Science</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                    </select>
                    <label htmlFor="minors">Choose a minor:</label>
                    <select name="minor" id="minor">
                        <option value="None">None</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                </div>
            </form>
            </body>

        );

    }

}

export default StudentRegister;

