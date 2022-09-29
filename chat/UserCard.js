import React, { Component } from 'react';
import styled from "styled-components";
import Chat from "./Chat";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

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

function OpenChatButton(props) {

    let history = useHistory();

    function handleClick() {
        history.push({
            pathname:"/singleChat", 
            data:props.otherUserData
        });
    }

    return (
        <button onClick={handleClick} style={{ marginLeft: '25px' }} className="btn btn-success">Chat</button>
    );
}

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.chatChild = React.createRef();
        this.state = {
            isLoaded: false,
            error: null,
            mentor: {},
        }
    }

    componentDidMount() {

    }

    openChat() {
        console.log("trying to open chat with " + this.props.otherUserData.firstName);
        this.chatChild.handleChatButtonClicked();
    }

    render() {
        return (
            <Container>
                {/* <Chat ref={this.chatChild} mentor={this.props.mentor} student={this.props.student}/> */}
                <FieldsContainer1>
                    <img
                        src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                        alt="new"
                        style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 5 }}
                    />

                </FieldsContainer1>
                <FieldsContainer2>
                    <h2 style={{margin: 5}}>{this.props.otherUserData.firstName + " " + this.props.otherUserData.lastName}</h2>

                    <OpenChatButton otherUserData={this.props.otherUserData} />

                    {/* <Button onClick={this.openChat}
                            variant="contained" size = "Large" style={{margin : "20px", backgroundColor: "#1fd127"}}>
                        Chat
                    </Button> */}

                </FieldsContainer2>

                {/* <Chat ref={this.chatChild} otherUserData={this.props.otherUserData} /> */}

            </Container>
        );
    }

}

export default UserCard;
