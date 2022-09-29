import React, { Component } from 'react';
import styled from "styled-components";
import List from 'react-list-select';
import SentRequestsItem from "./SentRequestsItem";


const Container = styled.div`
    margin-left : 25%;
    margin-right : 25%;
    margin-top : 5%;
    background-color:white;
    padding-top : 25px;
    padding-right : 3%;
    padding-bottom : 25px;
    margin-bottom: 50px;
    box-shadow:0 0 15px 4px rgba(192,192,192,0.3);
    border-radius: 15px;
`;

class SentRequestsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            userData: null,
            pendingR : [],
            acceptedR : [],
            deniedR : [],
            viewType: "pending",
        }
    }

    componentDidMount() {

        let req =  Object.keys(this.props.userData.mentorRequests)
        let pending = []
        let accepted = []
        let denyed = []



        for(let i = 0; i < req.length; i++){
            if (this.props.userData.mentorRequests[req[i]] === "SENT"){
                pending.push(req[i]);
            }else if (this.props.userData.mentorRequests[req[i]] === "ACCEPTED"){
                accepted.push(req[i])
            }else{
                denyed.push(req[i])
            }
        }

        this.setState({
            isLoaded: true,
            userData: this.props.userData,
            pendingR:
                pending.map(function(key) {
                    return (
                        <SentRequestsItem
                            uid = {key}
                        >
                        </SentRequestsItem>
                    );
                }),
            acceptedR:
                accepted.map(function(key) {
                    return (
                        <SentRequestsItem
                            uid = {key}
                        >
                        </SentRequestsItem>
                    );
                }),
            deniedR:
                denyed.map(function(key) {
                    return (
                        <SentRequestsItem
                            uid = {key}
                        >
                        </SentRequestsItem>
                    );
                }),
        });
    }


    render() {
        return (
            <div>

                <div className="inpageNav">
                    <button id="firstbtn" onClick={() => this.setState({viewType: "pending"})}
                            className={this.state.viewType === "pending" ? "active" : ''}>Pending
                    </button>
                    <button onClick={() => this.setState({viewType: "accepted"})}
                            className={this.state.viewType === "accepted" ? "active" : ''}>Accepted
                    </button>
                    <button id="lastbtn" onClick={() => this.setState({viewType: "denied"})}
                            className={this.state.viewType === "denied" ? "active" : ''}>Denied
                    </button>
                </div>

                {this.state.viewType === 'pending' ? (
                    <div>
                        {this.state.pendingR.length === 0 ? (
                            <div>
                                <Container>
                                    <h1
                                        style = {{paddingBottom : 15}}
                                    > Pending Requests</h1>
                                    <h3
                                        style = {{paddingBottom : 15}}
                                    >You Have No Pending Mentor Requests</h3>
                                </Container>
                            </div>
                        ) : (
                            <div>
                                <Container>
                                    <h1 style = {{paddingBottom : 15}}
                                    > Pending Requests</h1>
                                    <List
                                        items={this.state.pendingR}
                                    />
                                </Container>
                            </div>
                        )}
                    </div>
                ) : <span />}

                {this.state.viewType === 'accepted' ? (
                    <div>
                        {this.state.acceptedR.length === 0 ? (
                            <div>
                                <Container>
                                    <h1
                                        style = {{paddingBottom : 15}}
                                    > Accepted Requests</h1>
                                    <h3
                                        style = {{paddingBottom : 15}}
                                    >You Have No Accepted Mentor Requests</h3>
                                </Container>
                            </div>
                        ) : (
                            <div>
                                <Container>
                                    <h1 style = {{paddingBottom : 15}}
                                    > Accepted Requests</h1>
                                    <List
                                        items={this.state.acceptedR}
                                    />
                                </Container>
                            </div>
                        )}
                    </div>
                ) : <span />}
                {this.state.viewType === 'denied' ? (
                    <div>
                        {this.state.deniedR.length === 0 ? (
                            <div>
                                <Container>
                                    <h1
                                        style = {{paddingBottom : 15}}
                                    > Denied Requests</h1>
                                    <h3
                                        style = {{paddingBottom : 15}}
                                    >You Have No Denied Mentor Requests</h3>
                                </Container>
                            </div>
                        ) : (
                            <div>
                                <Container>
                                    <h1 style = {{paddingBottom : 15}}
                                    > Denied Requests</h1>
                                    <List
                                        items={this.state.deniedR}
                                    />
                                </Container>
                            </div>
                        )}
                    </div>
                ) : <span />}
            </div>
        )
    }

}

export default SentRequestsList;
