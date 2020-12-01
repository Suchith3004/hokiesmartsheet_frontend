import React, { Component } from 'react';

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
        
    };
    
    handleQuickButtonClicked = data => {
        console.log(data);
        // setQuickButtons(buttons.filter(button => button.value !== data));
    };
    
    handleChatButtonClicked() {
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

    }

    render() {
        return (
            // <Container>

<Widget
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          launcher={handleToggle => this.getCustomLauncher(handleToggle)}
          title={this.props.mentor.firstName + " " + this.props.mentor.lastName}
          subtitle={this.props.mentor.occupation + " at " + this.props.mentor.organizationName}
        />

        );
    }

}

export default Chat;
