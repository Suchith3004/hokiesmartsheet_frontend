import React, { Component } from 'react';
import { SearchBar } from '../utilities/SearchBar'
import SharedChecksheet from './SharedChecksheet'
import dbFetch from '../api/dbFetch'
import NavBar from "../utilities/NavBar";

export default class ChecksheetShare extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            userInfo: {},
            sumbitted: false,
            semesters: [],
            pathways: false,
            transfer: false,
            ap: false,
            viewType: 'share'
        }
    }

    componentDidMount() {
        dbFetch.get({
            endpoint: "/getUser/" + (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    isLoaded: true,
                    userInfo: data
                })
            })
            .catch((error) => {
                alert("Failed to create new user! " + error.message);
                this.setState({
                    isLoaded: true,
                    error,
                    submitted: false
                });
            });
    }

    fetchUserInfo = () => {
        this.setState({ isLoaded: false })
        dbFetch.get({
            endpoint: "/getUser/" + (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    userInfo: data
                })
            })
            .catch((error) => {
                alert("Failed to create new user! " + error.message);
                this.setState({
                    isLoaded: true,
                    error,
                    submitted: false
                });
            });
    }


    shareChecksheet = () => {
        this.setState({ isLoaded: false })
        dbFetch.post({
            endpoint: "/shareMenteeChecksheet",
            data: {
                menteeId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
                mentorId: this.props.location.mentorId,
                semesters: this.state.semesters,
                ap: this.state.ap,
                transfer: this.state.transfer,
                pathways: this.state.pathways
            }
        })
            .then((response) => {
                response.json()

                this.fetchUserInfo();

                this.setState({
                    isLoaded: true
                })

            })
            .catch((error) => {
                alert("Failed to create new user! " + error.message);
                this.setState({
                    isLoaded: true,
                    error,
                    submitted: false
                });
            });
    }

    render() {

        const cleanSemOptions = () => {

            if (!this.state.userInfo.semesters)
                return []

            const availableSem = this.state.userInfo.semesters.length
            const options = []
            for (var i = 1; i <= availableSem; i++)
                options.push({
                    value: i.toString(),
                    label: "Semester " + i
                })

            return options;

        }

        const handleChosenSemesters = (e) => {
            if (!e)
                return

            const chosenSems = []

            e.forEach(sem => {
                chosenSems.push(sem.value)
            })

            this.setState({
                semesters: chosenSems
            })
        }

        return <div>

            <NavBar current="chat" />
            <br />
            <br />
            <div>
                {this.state.userInfo.shared && this.state.userInfo.shared[this.props.location.mentorId] ? (
                    <div class="inpageNav">
                        <button id="firstbtn" onClick={() => this.setState({ viewType: "share" })} class={this.state.viewType === "share" ? "active" : ''}>Share</button>
                        <button id="lastbtn" onClick={() => this.setState({ viewType: "checksheet" })} class={this.state.viewType === "checksheet" ? "active" : ''}>Your Checksheet</button>
                    </div>
                ) : <span />}
            </div>
            <br></br>
            {this.state.viewType === "share" ? (
                <div className="info">
                    <h2 className="title">Select all elements of your checksheet you would like to share</h2>
                    <br></br>
                    <div >
                        <div> <label style={{ fontSize: 15 }}>Semesters:</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanSemOptions} handleChange={(e) => handleChosenSemesters(e)} /> </div>
                        <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <input type="checkbox" checked={this.state.ap} onChange={() => this.setState({ ap: !this.state.ap })} />
                    <label style={{ fontSize: 20, paddingLeft: 5, paddingRight: 40 }} >AP Classes</label>
                    <input type="checkbox" checked={this.state.transfer} onChange={() => this.setState({ transfer: !this.state.transfer })} />
                    <label style={{ fontSize: 20, paddingLeft: 5, paddingRight: 40 }} >Transfer</label>
                    <input type="checkbox" checked={this.state.pathways} onChange={() => this.setState({ pathways: !this.state.pathways })} />
                    <label style={{ fontSize: 20, paddingLeft: 5, paddingRight: 40 }} >Pathways</label>
                    <br></br>
                    <br></br>
                    <div className="inpageNav">
                        <button id='mainbtn' onClick={() => this.shareChecksheet()}>Share Checksheet</button>
                    </div>
                </div>
            ) : (
                    <div>
                        <SharedChecksheet userData={this.state.userInfo} isMentor={false} menteeId={(localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid)} />
                    </div>
                )}
        </div>
    }
}