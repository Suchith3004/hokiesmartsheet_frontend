import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from "./Semester";
import styled from 'styled-components';
import '@atlaskit/css-reset'
import { DragDropContext } from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'
import ApClasses from "./ApClasses";
import TransferClasses from "./TransferClasses";


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


export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            userData: this.props.userData,
            maxHeight: 0,
            pathways: {},
            viewType: "checksheet"
        };
    }

    componentDidMount() {
        this.calculateSemHeight()

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
        console.log({
            userId: this.props.userData.userId,
            courseId: draggableId,
            toSem: toSem,
            fromSem: fromSem,
            toIndex: destination.index
        })
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
                console.log((data.prerequisites && data.corequisites && !data.dependents))
                if (!(data.prerequisites && data.corequisites && !data.dependents)) {
                    alert('Prerequisites not met: ' + data.preReqsNotMet + '\nCorequisites not met: ' + data.coReqsNotMet + '\nDependents: ' + data.dependentCourses)
                }
                else {
                    this.setState({
                        isLoaded: true,
                        userData: data.userData
                    })
                }
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    };


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
                {this.state.viewType === 'checksheet' ? (
                    <DragDropContext
                        onDragStart={this.onDragStart}
                        onDragUpdate={this.onDragUpdate}
                        onDragEnd={this.onDragEnd}
                    >
                        {/*Using Sample Data Here*/}
                        {/*The Searchable list for homeless courses can be un commented here if needed*/}
                        {/*<SearchableList key={0} name = {"Unused Major Courses"} column={this.state.items.semesters[0]} tasks = {this.state.items.semesters[0].semesterCourses} showSearch = 'true' />*/}
                        <label style={{ fontSize: 24, backgroundColor: 10000, textAlign: "center" }}>Major : {userData.major}</label>
                        <div class="checksheet">
                            {/* <ApClasses  items = {this.state.items}/>
                        <TransferClasses  items = {this.state.items}/> */}
                            {userData.semesters.map((sem, index) => {
                                const column = sem;
                                const tasks = sem.semesterCourses;
                                const name = "Semester " + sem.semNum;
                                return <Column key={index} name={name} column={column} tasks={tasks} height={this.state.maxHeight} />
                            })}
                        </div>
                    </DragDropContext>
                ) : <span />}
            </div>


        }

    }
}
