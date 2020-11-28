import React, { Component, useEffect, useState } from 'react';
import fire from './config/Fire';
import CheckSheet from '../checksheet/Checksheet'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import dbFetch from '../api/dbFetch'
import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Sidebar } from 'primereact/sidebar';

const Container = styled.div`
text-align: center;
background-color: #a24857;
position: absolute;
top:
`;

function LogoutButton(props) {

    let history = useHistory();

    function handleClick() {
        fire.auth().signOut();
        history.push("/login");
    }

    return (
        <button style={{ borderRadius: 10, width: 150, boxShadow: 10, padding: 10, marginLeft: 150, position: "absolute", top : 40, right : 40}} onClick={handleClick}>Logout</button>
    );
}


class StudentHome extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isLoaded: true,
            error: null,
            userData: {}
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getUserChecksheet/" + fire.auth().currentUser.uid,
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    userData: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        return (
            <div>

                <Sidebar position="top" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                    style={{ height: '70px', backgroundColor: '#5D5C61', textAlign: 'center', display:'flex', justifyContent:'space-between'}}>
                    {/* <img src="../utilities/example.png" alt="Temp Image"></img> */}
                        <h3 style={{ color: 'white', backgroundColor: '#5D5C61', textAlign:'left', width: '250px', display:'inline'}}>{this.state ? this.state.userData.firstName : ''} {this.state ? this.state.userData.lastName : ''}</h3>
                        <h2 style={{ color: 'white', backgroundColor: '#5D5C61', width: '500px', display:'inline'}}>Your Checksheet</h2>
                </Sidebar>


                {/* <Container> */}
                {/* 
                    <label style={{ fontSize: 60, backgroundColor: 10000, textAlign: "center" }}>Welcome to the Student Page </label>

                    <div>
                        <Link to="/editcourses">
                        <button style={{ borderRadius: 10, width: 200, boxShadow: 10, padding: 10, align: 100 }} onClick={this.courseEdit}>Edit Courses</button>
                        </Link>
                        <LogoutButton/></div> */}


                {/* </Container> */}
                {/* <CheckSheet userId={fire.auth().currentUser.uid} userData={this.state.userData}/> */}


                {/* Ahmad's Branch */}
                    {/* <label style={{ fontSize: 60, backgroundColor: 10000, textAlign: "center" }}>My Checksheet </label>
                    <div style={{ backgroundColor: '#a24857' }}>
                        <Link to="/editcourses">
                            <button style={{ borderRadius: 10, width: 150, boxShadow: 10, padding: 10, align: 100, position: "absolute", top : 90, right : 40 }} onClick={this.courseEdit}>Edit Courses</button>
                        </Link>
                        <LogoutButton />
                    </div>
                    <CheckSheet />
                    <label style = {{marginTop :"5s0px"}}> Our goal is to provide an efficient way to plan out your semesters here at Virginia Tech. We aim to help organize what courses you will be taking every semester, depending on your major and minor. Additionally, in order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on similar interests.
                </label>
                </Container> */}
            </div>
        );

    }

}

export default StudentHome;

