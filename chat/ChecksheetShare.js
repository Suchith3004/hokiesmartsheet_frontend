import React, { Component } from 'react';
import SearchBar from '../utilities/SearchBar'

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
        this.fetchUserInfo();
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
                mentorId: this.props.mentorId,
                semesters: this.state.semesters,
                ap: this.state.ap,
                transfer: this.state.transfer,
                pathways: this.state.pathways
            }
        })
            .then((response) => {
                response.json()
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
            {this.state.userInfo.shared[this.props.mentorId] ? (
                <div class="inpageNav">
                    <button id="firstbtn" onClick={() => this.setState({ viewType: "share" })} class={this.state.viewType === "share" ? "active" : ''}>Share</button>
                    <button id="lastbtn" onClick={() => this.setState({ viewType: "checksheet" })} class={this.state.viewType === "checksheet" ? "active" : ''}>Checksheet</button>
                </div>
            ) : <span />}
            {this.state.viewType === "share" ? (
                <div className="info">
                    <h2 className="title">Select all elements of your checksheet you would like to share</h2>
                    <div >
                        <div> <label style={{ fontSize: 15 }}>Semesters:</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanSemOptions} handleChange={(e) => handleChosenSemesters(e)} /> </div>
                        <br></br>
                    </div>

                    <input type="checkbox" checked={this.state.ap} onChange={() => this.setState({ ap: !this.state.ap })} />
                    <label style={{ fontSize: 20, paddingLeft: 5, paddingRight: 40 }} >AP Classes</label>
                    <input type="checkbox" checked={this.state.transfer} onChange={() => this.setState({ transfer: !this.state.transfer })} />
                    <label style={{ fontSize: 20, paddingLeft: 5 }} >Transfer</label>
                    <input type="checkbox" checked={this.state.pathways} onChange={() => this.setState({ pathways: !this.state.pathways })} />
                    <label style={{ fontSize: 20, paddingLeft: 5 }} >Pathways</label>
                    <br></br>
                    <br></br>
                    <button id='mainbtn' onClick={() => this.assignElective()}>Assign Elective</button>
                </div>
            ) : (
                <div>
                    <ChecksheetShare userData={{}} isMentor={false} menteeId={(localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid)}/>
                </div>
            )}
        </div>
    }
}