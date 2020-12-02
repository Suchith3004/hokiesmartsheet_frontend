import React, { Component } from 'react';
import styled from "styled-components";
import NavBar from "../utilities/NavBar";
import Logo from '../utilities/logo_transparent.png';


const Container = styled.div`
    background-color:white;
    margin-left : 25%;
    margin-right : 25%;
    margin-top : 5%;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    text-color: black;
    padding: 10px;
`;

const FieldsContainer = styled.div`
    background-color:white;
    margin: 25px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius: 15px;
    padding: 15px;
`;

class About extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar current="about"/>
                <Container>
                    <FieldsContainer>
                        <h1 >About  </h1>
                    </FieldsContainer>
                    <FieldsContainer>
                        <img
                            src={Logo}
                            alt="new"
                            style={{  height: 300, width: 300, boxShadow: 10,  }}
                        />
                    </FieldsContainer>
                    <FieldsContainer>
                        <h3> Our goal is to implement a way to provide support to students here at Virginia Tech.   </h3>
                        <h3> We aim to help you develop a strong course plan by connecting you to mentors that have experience with VT courses</h3>
                        <h3>In order to help strengthen the community here, we offer a mentor support system for those who are looking to network and gain new connections based on academics, hobbies, and interests.
                        </h3>
                    </FieldsContainer>
                </Container>

            </div>
        );

    }

}

export default About;
