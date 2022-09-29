import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from "./Semester";
import '@atlaskit/css-reset'
import { DragDropContext } from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'
import ApClasses from './ApClasses'
import TransferClasses from './TransferClasses'
import CourseInfo from './CourseInfo'
import PathwaySelector from './PathwaySelector'
import ElectiveSelector from './ElectiveSelector'
import Pathways from './Pathways'

const circleStyle = {
    display: 'block',
    marginLeft: '100px',
    marginRight: '100px',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    position: 'absolute',
    boxSizing: 'border-box',
    top: '50%',
    left: '40%',
    marginTop: '-50px',
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}


export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            userData: this.props.userData,
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

    updateUserChecksheet = () => {
        console.log("called")
        dbFetch.get({
            endpoint: "/getUser/" + (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    userData: data
                });
                console.log("GOT HERE FIRST")
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    componentDidMount() {
        this.calculateSemHeight();
        // this.setState({isLoaded: false})
        // this.updateUserChecksheet();

        dbFetch.get({
            endpoint: "/getAllPathways",
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
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
        
    }

    calculateSemHeight = () => {
        if (!this.state.userData)
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
        let classHandles = ReactDOM.findDOMNode(this).getElementsByClassName('classHandleText');
        for (let elem of classHandles) {
            elem.style.color = "inherit";
        }
        const { destination, source, draggableId } = result;

        if (!destination || !source || !destination.droppableId || !source.droppableId || !draggableId)
            return

        if ((destination.droppableId === source.droppableId && destination.index === source.index) || !destination) {
            return;
        }

        const fromSem = parseInt(source.droppableId.split(" ")[1]);
        const toSem = parseInt(destination.droppableId.split(' ')[1]);

        if (destination.droppableId === source.droppableId) {
            return;
        }

        this.setState({isLoaded: false})
        dbFetch.put({
            endpoint: "/moveClass",
            data: {
                userId: this.props.userData.userId,
                courseId: draggableId,
                toSem: toSem,
                fromSem: fromSem,
                toIndex: destination.index
            }
        })
            .then(response => response.json())
            .then((data) => {
                if (!(data.prerequisites && data.corequisites && !data.dependents)) {
                    alert('Prerequisites not met: ' + data.preReqsNotMet + '\nCorequisites not met: ' + data.coReqsNotMet + '\nDependents: ' + data.dependentCourses)
                    this.setState({
                        isLoaded: true
                    })
                }
                else {
                    this.setState({
                        userData: data.userData,
                        isLoaded: true
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    };

    changeCompletionStatus = (courseId, semNum) => {
        const semester = this.state.userData.semesters[semNum];

        semester.semesterCourses.forEach((course, index) => {
            if (courseId === course.courseId) {
                semester.semesterCourses[index].completed = false;
                const userSheet = this.state.userData;
                userSheet.semesters[semNum] = semester;
                this.setState({
                    userData: userSheet
                })
            }
        })
    }


    handleCourseClick = (courseId, semNum, isPathway, isElective, fromCourseInfo) => {

        this.setState({isLoading: false})
        this.updateUserChecksheet();

        var viewType = 'course-info'
        if (courseId.includes("Pathway") || (isPathway && fromCourseInfo)) {
            viewType = 'pathway-selector'
        }
        if (courseId.includes("Elective") || (isElective && fromCourseInfo)) {
            viewType = 'elective-selector'
        }
        if (courseId.includes("XXX")) {
            this.setState({ xxxElective: true})
            viewType = 'elective-selector'
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

        this.setState({isLoading: false})
        this.updateUserChecksheet()
        
        this.setState({ viewType: newView })

    }

    render() {

        const { error, isLoaded, userData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>
                <motion.span
                    style={circleStyle}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                />
            </div>
        }
        else {

            return <div>
                <div class="inpageNav">
                    <button id="firstbtn" onClick={() => this.changeViewType("checksheet")} class={this.state.viewType === "checksheet" ? "active" : ''}>Checksheet</button>
                    <button onClick={() => this.changeViewType("ap-transfer")} class={this.state.viewType === "ap-transfer" ? "active" : ''}>AP/Transfer</button>
                    <button id="lastbtn" onClick={() => this.changeViewType("pathway")} class={this.state.viewType === "pathway" ? "active" : ''}>Pathways</button>
                </div>

                {this.state.viewType === 'checksheet' ? (
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
                                return <Column key={index} name={name} column={column} tasks={tasks} height={this.state.maxHeight} semNum={sem.semNum} courseClick={this.handleCourseClick} alertCompleteHandler={this.changeCompletionStatus} />
                            })}
                        </div>
                    </DragDropContext>
                ) : <span />}

                {this.state.viewType === 'ap-transfer' ? (
                    <div style={{ marginBottom: 100 }}>
                        <ApClasses equivalents={userData.apEquivalents} />
                        <br />
                        <br />
                        <TransferClasses transfers={userData.transferCourses} />
                    </div>
                ) : <span />}

                {this.state.viewType === 'pathway' ? (
                    <div style={{ marginBottom: 100 }}>
                        <Pathways userPathways={userData.pathways} pathways={this.state.pathways} />
                    </div>
                ) : <span />}

                {this.state.viewType === 'course-info' ? (
                    <div style={{ marginBottom: 100 }}>
                        <CourseInfo courseId={this.state.currCourse} pathways={this.state.pathways} handleClick={this.handleCourseClick} isPathway={this.state.isPathway} isElective={this.state.isElective} />
                    </div>
                ) : <span />}

                {this.state.viewType === 'pathway-selector' ? (
                    <div style={{ marginBottom: 100 }}>
                        <PathwaySelector pathwayId={this.state.currCourse} semNum={this.state.semNum} pathways={this.state.pathways} changeViewBack={() => this.changeViewType("checksheet")} apOptions={this.state.userData.apEquivalents} transferOptions={this.state.userData.transferCourses} />
                    </div>
                ) : <span />}

                {this.state.viewType === 'elective-selector' ? (
                    <div style={{ marginBottom: 100 }}>
                        <ElectiveSelector electiveId={this.state.currCourse} semNum={this.state.semNum} pathways={this.state.pathways} changeViewBack={() => this.changeViewType("checksheet")} apOptions={this.state.userData.apEquivalents} transferOptions={this.state.userData.transferCourses} categories={this.state.categories} xxxElective={this.state.xxxElective}/>
                    </div>
                ) : <span />}

                
            </div>


        }
    }
}