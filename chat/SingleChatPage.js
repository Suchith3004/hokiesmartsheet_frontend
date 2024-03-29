import React, { Component } from 'react';

import fire from "../login/config/Fire";

import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, toggleWidget, setQuickButtons, deleteMessages } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import dbFetch from '../api/dbFetch'
import NavBar from "../utilities/NavBar";


import './override.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

var collectionName;

var unsubscribe;

const firedb = fire.firestore();

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            subtitle: "",
            userData: {}
        }
    }

    handleNewUserMessage = newMessage => {

        console.log(`New message incoming! ${newMessage}`);

        let currentUserId = (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid);

        let displayName = currentUserId;

        //let displayName = this.state.userData.firstName + " " + this.state.userData.lastName;

        console.log("setting ref");
        firedb.collection(collectionName).add({
                name: displayName,
                id: currentUserId,
                message: newMessage,
                created: Date.now(),
                invisible: false
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

    };

    componentWillUnmount() {
        if (unsubscribe) {
            unsubscribe();
        }
    }

    handleQuickButtonClicked = data => {
        console.log(data);

        toggleWidget();

        if (data === "Back") {
            this.props.history.push('/chat');
        }

        // setQuickButtons(buttons.filter(button => button.value !== data));
    };

    handleChatButtonClicked() {
        toggleWidget();
    }

    getCustomLauncher = (handleToggle) => < span / >

        componentDidMount() {

            if (!this.props.location.data) {
                return;
            }

            let localUserId = (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid);

            var usertitle;

            if (this.props.location.data.isUsersMentor) {
                usertitle = this.props.location.data.occupation + " at " + this.props.location.data.organizationName;
            } else {
                usertitle = this.props.location.data.major + " class of " + this.props.location.data.year;
            }

            this.setState({ subtitle: usertitle });

            toggleWidget();
            deleteMessages();
            setQuickButtons([{ label: "Exit", value: "Back" }]);


            console.log(this.props.location.data);

            let superCollection;

            if (this.props.location.data.isUsersMentor) {
                console.log("I am the student");
                superCollection = "chats/" + this.props.location.data.userId + "---" + localUserId + "/";
            } else {
                console.log("I am the mentor");
                superCollection = "chats/" + localUserId + "---" + this.props.location.data.userId + "/";
            }

            collectionName = superCollection + "messages";

            console.log("collection name = ", collectionName);

            console.log("determining if chat exists")


            const query = firedb.doc(superCollection);
            if (query.empty) {
                console.log("chat doesn't exist");
            }

            unsubscribe = firedb.collection(collectionName)
                .onSnapshot(function(querySnapshot) {
                    console.log("snapshot set");
                    let orderedMessages = [];
                    querySnapshot.docChanges().forEach(function(change) {
                        let doc = change.doc;
                        let messageData = doc.data();
                        console.log("new doc ", doc.id, " =>", doc.data());
                        if (messageData.id && messageData.message && messageData.created && !doc.metadata.hasPendingWrites && !doc.invisible) {
                            orderedMessages.push(messageData);
                        }
                    });
                    orderedMessages.sort(function(a, b) { return a.created - b.created });
                    orderedMessages.forEach(function(m) {
                        if (m.id === fire.auth().currentUser.uid) {
                            addUserMessage(m.message);
                        } else {
                            addResponseMessage(m.message);
                        }
                    });
                });

        }

    render() {
        return <div > {
                this.props.location.data ? (


                    // <Container>
                    <
                    Widget handleNewUserMessage = { this.handleNewUserMessage }
                    handleQuickButtonClicked = { this.handleQuickButtonClicked }
                    launcher = { handleToggle => this.getCustomLauncher(handleToggle) }
                    title = { this.props.location.data.firstName + " " + this.props.location.data.lastName }
                    subtitle = { this.state.subtitle }
                    fullScreenMode = { true }
                    showCloseButton = { false }
                    />

                ) : (

                    <
                    Redirect to = "/chat" / >

                )
            } <
            /div>
    }

}

export default Chat;