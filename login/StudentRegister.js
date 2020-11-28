import React, { Component, useState } from 'react';
import styled from "styled-components";
import ClassesReg from "./ClassesReg";
import MentorRegister from "./MentorRegister";
import { Draggable } from "react-beautiful-dnd";
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'



const Container = styled.div`
  padding:20px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  margin-bottom:100px
`;

async function createFirebaseAuthUser(email, password) {
    await fire.auth().createUserWithEmailAndPassword(email, password)
        .then((u) => {
            return 
        })
        .catch((error) => {
            throw new Error(error.message)
        })

}

class StudentRegister extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registeringAsStudent: false,
            registeringAsMentor: false,
            isLoaded: false,
            error: null,
            courseOptions: [],
            majors: [],
            submitted: false,
            newUser: {},
            firstname: null,
            lastname: null,
            email: null,
            password: null
        }
    }

    createUser(newUser, append) {
        this.appendBasicInfo(newUser)
            .then((updatedUser) => {
                
                dbFetch.post({
                    endpoint: "/createUser",
                    data: this.state.newUser
                })
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({
                            isLoaded: true
                        })

                        if (append)
                            this.appendMentorToUser(newUser)
                        else
                            this.props.history.push('/createUser')
                    })
                    .catch((error) => {
                        alert("Failed to create new user! " + error.message);
                        this.setState({
                            isLoaded: true,
                            error,
                            submitted: false
                        });
                    });
            })
    }

    appendMentorToUser(newUser) {
        dbFetch.post({
            endpoint: "/addMentorToUser",
            data: newUser
        })
            .then((response) => {
                response.json()
                this.setState({
                    isLoaded: true
                })
                this.props.history.push("/createUser")

            })
            .catch((error) => {
                alert("Failed to create new user! " + error.message);
                this.setState({
                    isLoaded: true,
                    error,
                    submitted: false
                });
            });

    }

    async appendBasicInfo(newUser) {
        if (!this.state.firstname || !this.state.lastname || !this.state.email || !this.state.password) {
            alert("One or more of the required fields are missing!");
            this.setState({
                submitted: false
            })
            return null
        }

        if (this.state.password.length < 6) {
            alert("Password must be 6 or more characters long!");
            this.setState({
                submitted: false
            })
            return null
        }

        await createFirebaseAuthUser(this.state.email, this.state.password)
            .then((uid) => {

                newUser.userId = fire.auth().currentUser.uid;
                newUser.firstName = this.state.firstname;
                newUser.lastName = this.state.lastname;

                this.setState({
                    newUser: newUser
                })

                return newUser;

            })
            .catch(e => {
                alert(e.message);
                this.setState({
                    submitted: false
                })
                return null
            })
    }
    
    render() {

        

        const handleSubmit = (userInfo, type) => {
            if (!userInfo) {
                alert("One or more of the required fields are missing!");
                this.setState({
                    submitted: false
                })
                return null
            }

            const newUser = this.state.newUser;

            for (var key in userInfo)
                newUser[key] = userInfo[key]

            const rStudent = this.state.registeringAsStudent
            const rMentor = this.state.registeringAsMentor

            if(!(rStudent && rMentor && type === 'mentor'))
                this.createUser(newUser, rStudent && rMentor)

            this.setState({ newUser: newUser })

        }


        const handleInputChange = (event) => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            this.setState({
                [name]: value
            });
        }

        const handleClick = () => {
            this.setState({
                submitted: true
            })
        }
        return (

            <Container>
                <label style={{ fontSize: 60, padding: -40 }}><u style={{ color: 'white', borderRadius: 15 }}>Registration</u></label>

                <div className="info">
                    <div>  <input className="fname" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="fname" type="text" name="fname" onChange={(e) => this.setState({ firstname: e.target.value })} placeholder="Frist name" /></div>
                    <br></br>
                    <div>  <input className="lname" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="lname" type="text" name="lname" onChange={(e) => this.setState({ lastname: e.target.value })} placeholder="Last name" /></div>
                    <br></br>
                    <div>  <input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="email" type="text" name="email" onChange={(e) => this.setState({ email: e.target.value })} placeholder="Email" /></div>
                    <br></br>
                    <div>  <input style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} className="password" type="text" name="password" onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" /></div>

                    <h2 style={{ color: 'white' }}>Select all that apply:</h2><br />

                    <input type="checkbox" name="registeringAsStudent" checked={this.state.registeringAsStudent} onChange={handleInputChange} />
                    <label style={{ fontSize: 20, paddingLeft: 5, paddingRight: 40 }} for="registeringAsStudent">VT Student</label>
                    <input type="checkbox" name="registeringAsMentor" checked={this.state.registeringAsMentor} onChange={handleInputChange} />
                    <label style={{ fontSize: 20, paddingLeft: 5 }} for="registeringAsStudent">Mentor</label>
                    <br></br>
                    <br></br>

                    {this.state.registeringAsStudent ? (
                        <ClassesReg submitted={this.state.submitted} submit={handleSubmit} />
                    ) : (<span />)}
                    {this.state.registeringAsMentor ? (
                        <MentorRegister student={this.state.registeringAsStudent} submitted={this.state.submitted} submit={handleSubmit} />
                    ) : (<span />)}

                    {this.state.registeringAsMentor || this.state.registeringAsStudent ? (
                        <button onClick={handleClick} style={{ marginLeft: '25px', marginBottom: '20px', borderRadius: 10, boxShadow: 10 }} className="btn btn-success">Complete Registration</button>
                    ) : (<span />)}

                </div>

            </Container>

        );

    }

}

export default StudentRegister;
