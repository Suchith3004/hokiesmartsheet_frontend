import React, { Component } from 'react';
import MentorRegister from './MentorRegister'

export default class AddMentor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            userInfo: null,
            sumbitted: false
        }
    }

    appendMentorToUser = () => {
        dbFetch.post({
            endpoint: "/addMentorToUser",
            data: this.state.userInfo
        })
            .then((response) => {
                response.json()
                this.setState({
                    isLoaded: true
                })
                this.props.history.push("/home")

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

        const handleSubmit = (userInfo, type) => {
            if (!userInfo) {
                alert("One or more of the required fields are missing!");
                this.setState({
                    submitted: false
                })
                return null
            }

            userInfo.userId = (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid);

            this.setState({ userInfo: userInfo })
            this.appendMentorToUser();

        }

    
        return <div className="info">
            <MentorRegister student={true} submitted={this.state.submitted} submit={handleSubmit} />
            <button onClick={() => this.setState({submitted: true})} style={{ marginLeft: '25px', marginBottom: '20px', borderRadius: 10, boxShadow: 10 }} className="btn btn-success">Complete Registration as Mentor</button>
        </div>
    }


}