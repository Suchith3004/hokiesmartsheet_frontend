import React, { Component } from 'react';
import fire from './config/Fire';

class MentorRegister extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <body>
            <form action="/">
                <h1>Mentor Registration</h1>
                <div className="info">
                    <input className="fname" type="text" name="name" placeholder="First name"/>
                    <input className="mname" type="text" name="name" placeholder="Middle name"/>
                    <input className="lname" type="text" name="name" placeholder="Last name"/>
                    <input className="occupation" type="text" name="name" placeholder="Occupation"/>
                    <input type="text" name="name" placeholder="Phone number"/>
                </div>
            </form>
            </body>

        );

    }

}

export default MentorRegister;

