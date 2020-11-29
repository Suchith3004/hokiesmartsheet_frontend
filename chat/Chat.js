import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';

import fire from "../login/config/Fire";

import {Widget, addResponseMessage, addLinkSnippet, addUserMessage, toggleWidget, setQuickButtons} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

var collectionName;

const firedb = fire.firestore();

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            userData: {}
        }
    }
    
    handleNewUserMessage = newMessage => {

        console.log(`New message incoming! ${newMessage}`);
        // addResponseMessage('response');

        let currentUser = fire.auth().currentUser;

        let displayName = currentUser.firstName ? currentUser.firstName : "unknown";

        console.log("setting ref");
        firedb.collection(collectionName).add({
            name: displayName,
            id: currentUser.uid,
            message: newMessage,
            created: Date.now()
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });    
        
/*
        var postListRef = firedb.ref("posts");
        var newPostRef = postListRef.push();
        newPostRef.set({
            message: "text",
            username: "mysterious stranger"
        });
*/
        // Now send the message throught the backend API
    };
    
    handleQuickButtonClicked = data => {
        console.log(data);
        // setQuickButtons(buttons.filter(button => button.value !== data));
    };
    
    handleChatButtonClicked() {
        /*
        messaging.getToken({vapidKey: VAPID_KEY}).then((currentToken) => {
            if (currentToken) {
                console.log(currentToken);
                cloudToken = currentToken;
            } else {
                // Show permission request.
                console.log('No registration token available. Request permission to generate one.');
                // Show permission UI.
            }
            }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            });         
        */   
        toggleWidget();
    }

    getCustomLauncher = (handleToggle) =>
    <span></span>

    componentDidMount() {

        collectionName = "chats/" + this.props.mentor.uid + "---" + this.props.student.uid + "/messages";

        console.log("getting first messages");

        firedb.collection(collectionName)
        .onSnapshot(function(querySnapshot) {
            let orderedMessages = [];
            querySnapshot.docChanges().forEach(function(change) {
                let doc = change.doc;
                let messageData = doc.data();
                console.log("new doc ", doc.id, " =>", doc.data());
                if(messageData.id && messageData.message && messageData.created && !doc.metadata.hasPendingWrites) {
                    orderedMessages.push(messageData);
                }
            });
            orderedMessages.sort(function(a, b){return a.created - b.created});
            orderedMessages.forEach(function(m){
                if (m.id === fire.auth().currentUser.uid) {
                    addUserMessage(m.message);
                }else {
                    addResponseMessage(m.message);
                }
            });
        });

            /*
            firedb.collection("chats/mentorid-userid/messages").get()
            .then(function(collection) {
                console.log("collection = ");
                collection.forEach(function(doc) {
                    let messageData = doc.data();
                    console.log(doc.id, " => ", doc.data());
                    if(messageData.id && messageData.message) {
                        if (messageData.id === fire.auth().currentUser.uid) {
                            addUserMessage(messageData.message);
                        }else {
                            addResponseMessage(messageData.message);
                        }
                    }
                });
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            */

        // addResponseMessage('Welcome to this awesome chat!');
        // dbFetch.get({
        //     endpoint: "/getUserChecksheet/UID",
        //     data: {}
        // })
        //     .then(response => response.json())
        //     .then((data) => {

        //         this.setState({
        //             isLoaded: true,
        //             mentor: data
        //         });

        //     })
        //     .catch((error) => {
        //         console.error("Failed to fetch mentor data: " + error.message);
        //         this.setState({
        //             isLoaded: true,
        //             error
        //         });
        //     });
    }

    render() {
        return (
            // <Container>

<Widget
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          launcher={handleToggle => this.getCustomLauncher(handleToggle)}
          // profileAvatar={'text'}
          title={this.props.mentor.firstName + " " + this.props.mentor.lastName}
          subtitle={this.props.mentor.occupation + " at " + this.props.mentor.organizationName}
        />

            //     <img
            //         src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
            //         alt="new"
            //         style={{ borderRadius: 200, height: 150, width: 150, boxShadow: 10, padding: 10 }}
            //     />

            //     <h2
            //     style={{margin: 20}}>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
            //     <FieldsContainer>
            //     <h5>{"Occupation: " + this.state.mentor.occupation}</h5>
            //     <h5>{"Organization: " + this.state.mentor.organizationName}</h5>
            //     <h5>{"My Bio: " + this.state.mentor.description}</h5>
            //     <h5 style = {{display : "inline-block"}}>{"VT Alumni: "}</h5>
            //     <Checkbox checked={this.state.mentor.vtAlumni || false}/> <br />
            //     <button style={{ borderRadius: 10, width: 100, boxShadow: 10, padding: 10}} onClick={this.handleChatButtonClicked}>Chat</button>
            //     </FieldsContainer>
            // </Container>
        );
    }

}

export default Chat;
