import React, { Component } from 'react';
import styled from "styled-components";
import Chat from "./Chat";

const Container = styled.div`
    width:100%;
    height: 150px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

const FieldsContainer1 = styled.div`
  background-color:white;
  width: 35%;
  height: 150px;
  float: left;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
   border-radius: 15px;
`;

const FieldsContainer2 = styled.div`
    background-color:white;
    height: 150px;
    margin-top: 10px;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    padding : 10px;
    border-radius: 15px;
`;

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.chatChild = react.createRef();
        this.state = {
            isLoaded: false,
            error: null,
            mentor: {},
        }
    }

    componentDidMount() {

    }

    openChat() {
        this.chatChild.handleChatButtonClicked();
    }

    render() {
        return (
            <Container>
                <Chat ref={this.chatChild} mentor={this.props.mentor} student={this.props.student}/>
                <FieldsContainer1>
                    <img
                        src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                        alt="new"
                        style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 5 }}
                    />

                </FieldsContainer1>
                <FieldsContainer2>
                    <h2
                        style={{margin: 5}}>{this.props.userData.firstName + " " + this.props.userData.lastName}</h2>
                </FieldsContainer2>

                <Button onClick={this.openChat}
                            variant="contained" size = "Large" style={{margin : "20px", backgroundColor: "#1fd127"}}>
                        Request Help
                    </Button>

            </Container>
        );
    }

}

export default MentorItem;
