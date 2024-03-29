import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from "../checksheet/Semester";
import '@atlaskit/css-reset'
import { DragDropContext } from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'
import ApClasses from '../checksheet/ApClasses'
import TransferClasses from '../checksheet/TransferClasses'
import CourseInfo from '../checksheet/CourseInfo'
import PathwaySelector from '../checksheet/PathwaySelector'
import ElectiveSelector from '../checksheet/ElectiveSelector'
import Pathways from '../checksheet/Pathways'
import NavBar from "../utilities/NavBar";

const circleStyle = {
    display: 'block',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}


export default class SharedChecksheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            userData: this.props.userData !== undefined ? this.props.userData : this.props.location.userData,
            maxHeight: 0,
            pathways: {},
            categories: ["Capstone", "Natural Science", "Professional Writing", "Communications", "CS Theory", "Statistics"],
            currCourse: null,
            viewType: "checksheet",
            isPathway: false,
            isElective: false,
            xxxElecive: false
        };
    }


    componentDidMount() {
        this.calculateSemHeight();

        dbFetch.get({
            endpoint: "/getAllPathways",
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: this.props.isMentor !== undefined ? !this.props.isMentor : !this.props.location.isMentor,
                    pathways: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });


        if (this.props.isMentor || (this.props.isMentor === undefined && this.props.location.isMentor)) {
            dbFetch.put({
                endpoint: "/getSharedChecksheet",
                data: {
                    mentorId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
                    menteeId: this.props.menteeId !== undefined ? this.props.menteeId : this.props.location.menteeId
                }
            })
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        isLoaded: true,
                        userData: data
                    });
                })
                .catch((error) => {
                    console.error("Failed to fetch course. " + error.message);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
        }

    }

    calculateSemHeight = () => {
        if (!this.state.userData.semesters)
            return

        var maxHeight = 0;
        this.state.userData.semesters.forEach(semester => {
            if (semester.semesterCourses.length > maxHeight)
                maxHeight = semester.semesterCourses.length
        })

        this.setState({
            maxHeight: maxHeight
        })
    }

    onDragStart = () => {
        let classHandles = ReactDOM.findDOMNode(this).getElementsByClassName('classHandleText');
        for (let elem of classHandles) {
            elem.style.color = "orange";
        }
    };

    onDragUpdate = () => {
        //Implement if need changes while in drag
    };

    onDragEnd = result => {

    };

    handleCourseClick = (courseId, semNum, isPathway, isElective) => {

        this.setState({ isLoading: false })
        this.updateUserChecksheet();

        var viewType = 'course-info'
        if (courseId.includes("Pathway")) {
            return
        }
        if (courseId.includes("Elective")) {
            return
        }
        if (courseId.includes("XXX")) {
            return
        }


        this.setState({
            currCourse: courseId,
            semNum: semNum ? semNum : this.state.semNum,
            isPathway: isPathway ? isPathway : this.state.isPathway,
            isElective: isElective
        })

        this.changeViewType(viewType)
    }

    changeViewType = (newView) => {

        this.setState({ isLoading: false })
        this.setState({ viewType: newView })

    }


    render() {

        const { error, isLoaded, userData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>
                {/* <motion.span
                    style={circleStyle}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                /> */}
            </div>
        }
        else {

            return <div>
                {this.props.isMentor || (this.props.isMentor === undefined && this.props.location.isMentor) ? (
                    <NavBar current="chat" />
                ) : <span />}


                <div class="inpageNav">
                    <button id="firstbtn" onClick={() => this.changeViewType("checksheet")} class={this.state.viewType === "checksheet" ? "active" : ''}>Checksheet</button>
                    <button onClick={() => this.changeViewType("ap-transfer")} class={this.state.viewType === "ap-transfer" ? "active" : ''}>AP/Transfer</button>
                    <button id="lastbtn" onClick={() => this.changeViewType("pathway")} class={this.state.viewType === "pathway" ? "active" : ''}>Pathways</button>
                </div>

                {this.state.viewType === 'checksheet' && this.state.userData.semesters ? (
                    <DragDropContext
                        onDragStart={this.onDragStart}
                        onDragUpdate={this.onDragUpdate}
                        onDragEnd={this.onDragEnd}
                    >
                        <h2 style={{ color: "white", textAlign: "center", marginTop: "40px" }}>School : {userData.school}</h2>
                        <h2 style={{ color: "white", textAlign: "center", marginTop: "10px" }}>Major : {userData.major}</h2>
                        <h2 style={{ color: "white", textAlign: "center", marginTop: "10px" }}>Credits : {userData.totalCredits}</h2>

                        <div class="checksheet">
                            {userData.semesters.map((sem, index) => {
                                const column = sem;
                                const tasks = sem.semesterCourses;
                                const name = "Semester " + sem.semNum;
                                return <Column key={index} name={name} column={column} tasks={tasks} height={this.state.maxHeight} semNum={sem.semNum} courseClick={this.handleCourseClick} alertCompleteHandler={null} />
                            })}
                        </div>
                    </DragDropContext>
                ) : <span />}

                {this.state.viewType === 'ap-transfer' ? (
                    <div style={{ marginBottom: 100 }}>
                        {userData.apEquivalents ? (
                            <ApClasses equivalents={userData.apEquivalents} />
                        ) : <span />}
                        <br />
                        <br />
                        {userData.transferCourses ? (
                            <TransferClasses transfers={userData.transferCourses} />
                        ) : <span />}
                    </div>
                ) : <span />}

                {this.state.viewType === 'pathway' && userData.pathways? (
                    <div style={{ marginBottom: 100 }}>
                        <Pathways userPathways={userData.pathways} pathways={this.state.pathways} />
                    </div>
                ) : <span />}

                {this.state.viewType === 'course-info' ? (
                    <div style={{ marginBottom: 100 }}>
                        <CourseInfo courseId={this.state.currCourse} pathways={this.state.pathways} handleClick={this.handleCourseClick} isPathway={this.state.isPathway} isElective={this.state.isElective} />
                    </div>
                ) : <span />}



            </div>


        }
    }
}