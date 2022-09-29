import React, { Component } from 'react';
import dbFetch from "../api/dbFetch";
import styled from "styled-components";
import fire from "../login/config/Fire";
import Logo from '../utilities/output-onlinepngtools.png';
import Button from "@material-ui/core/Button";
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom';


const FieldsContainer = styled.div`
    background-color:white;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
    text-align: center;
    padding : 5px;
    margin-top: 10px;
    margin: 4px 40px;
`;
const circleStyle = {
    display: 'block',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    boxSizing: 'border-box',
    top: 0,
    left: 0
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}

function OpenChatButton(props) {

    let history = useHistory();

    function handleClick() {
        history.push({
            pathname: "/singleChat",
            data: props.otherUserData
        });
    }

    return (
        <button onClick={handleClick} style={{ display: 'inline-block', margin: '25px' }} className="btn btn-success">Chat</button>
    );
}

function OpenChecksheetShare(props) {

    let history = useHistory();

    function handleClick() {
        history.push({
            pathname: "/checksheetShare",
            mentorId: props.otherUserData.userId
        });
    }

    return (
        <button onClick={handleClick} style={{ display: 'inline-block', margin: '25px' }} className="btn btn-success">Share Checksheet</button>
    );
}


class MentorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: "",
            mentor: {},
            buttonIsDisabled: false,
        }
    }

    componentDidMount() {
        if (this.props.uid != null) {
            dbFetch.get({
                endpoint: "/getUser/" + this.props.uid,
                data: {}
            })
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        isLoaded: true,
                        mentor: data,
                        buttonIsDisabled: false,
                    });


                })
                .catch((error) => {
                    console.error("Failed to fetch mentor data: " + error.message);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
        } else {
            this.setState({
                isLoaded: true,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.uid != prevProps.uid) {
            dbFetch.get({
                endpoint: "/getUser/" + this.props.uid,
                data: {}
            })
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        isLoaded: true,
                        mentor: data,
                        buttonIsDisabled: false,
                    });

                })
                .catch((error) => {
                    console.error("Failed to fetch mentor data: " + error.message);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
        }
    }


    sendMentorRequest() {
        let menteeUid = fire.auth().currentUser.uid;
        let mentorUid = this.props.uid;

        dbFetch.post({
            endpoint: "/sendMenteeRequest",
            data: {
                menteeId: menteeUid,
                mentorId: mentorUid,
            }
        })
            .then((response) => response.json())
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error,
                    submitted: false
                });
            });

        this.setState({
            buttonIsDisabled: true
        })

        if (this.props.deleteMentor)
            this.props.deleteMentor(mentorUid)
    }

    getString(array) {
        if (array != null) {
            let i;
            let string = "";
            for (i = 0; i < array.length; i++) {
                if (i === array.length - 1) {
                    string = string + array[i]
                } else {
                    string = string + array[i] + ", "
                }
            }
            return string
        }
        return "Not Rendered"
    }

    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) {
            return <div>
                <motion.span
                    style={circleStyle}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                />
            </div>
        } else if (this.state.mentor.firstName == undefined) {
            return (<h2
                style={{ paddingBottom: 20, paddingRight: 200, paddingLeft: 200, }}
            > Select A Mentor</h2>)
        }
        else {
            return (
                <div className='mentor-details'>
                    <img
                        src={Logo}
                        alt="new"
                        style={{ borderRadius: 200, height: 120, width: 170, boxShadow: 10, padding: 5, }}
                    />
                    <FieldsContainer>
                        <h2>{this.state.mentor.firstName + " " + this.state.mentor.lastName}</h2>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"Occupation: "}</h5>
                        <h5>{this.state.mentor.occupation}</h5>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"Organization: "}</h5>
                        <h5>{this.state.mentor.organizationName}</h5>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"Alumni: "}</h5>
                        <h5>{this.state.mentor.alumni}</h5>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"My Bio: "}</h5>
                        <h5>{this.state.mentor.description}</h5>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"My Interests: "}</h5>
                        <h5>{this.getString(this.state.mentor.mentorInterests)}</h5>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"My Hobbies: "}</h5>
                        <h5>{this.getString(this.state.mentor.hobbies)}</h5>
                    </FieldsContainer>
                    <FieldsContainer>
                        <h5>{"My Qualities: "}</h5>
                        <h5>{this.getString(this.state.mentor.qualities)}</h5>
                    </FieldsContainer>

                    {this.props.deleteMentor ? (
                        <Button onClick={() => {
                            this.sendMentorRequest()
                            alert('Your Request Has Been Submitted')
                        }}
                            variant="contained" size="large" style={{ margin: "20px", backgroundColor: "#1fd127" }}
                            disabled={this.state.buttonIsDisabled}
                        >
                            Request Help
                        </Button>
                    ) : (
                            <div className='mentor-details'>
                                <OpenChatButton otherUserData={this.props.otherUserData} />
                                <OpenChecksheetShare otherUserData={this.props.otherUserData} />
                            </div>
                        )}
                </div>
            );
        }

    }
}

export default MentorProfile;
