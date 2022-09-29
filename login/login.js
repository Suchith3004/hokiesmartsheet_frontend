import React, { Component } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import Logo from '../utilities/logo_transparent.png';






function SubmitButton(props) {

    let history = useHistory();

    function handleClick() {
        history.push("/editCourses");
    }

    return (
        <button onClick={handleClick} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
    );
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {

        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <div class="login">

                <h1><label style={{ fontSize: 70, color: "white" }} htmlFor="title>">Virginia Tech Course Planning & Mentoring Portal</label></h1>
                <br></br>
                <img src={Logo} height="200" width="200" alt='website logo' />


                <div className="form-group">
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />

                </div>
                <button onClick={this.login} className="btn btn-primary">Login</button>
                <SubmitButton email={this.state.email} password={this.state.password} />

            </div>
        );

    }


}

export default Login;
