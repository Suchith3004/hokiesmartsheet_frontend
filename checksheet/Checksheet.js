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


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    padding: 70px;
    background-color:#b04f5f;
    align-items: center;
    margin-left:150px;
    margin-top: 50px;
`;

const circleStyle = {
    display: 'block',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    position: 'absolute',
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
            moveClass: {}
        };
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

        if (!destination) {
            return;
        }
        if (destination.draggableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (destination.droppableId === source.droppableId)
            return;

        
        const fromSem = source.droppableId.split(" ")[1];
        const toSem = destination.droppableId.split(' ')[1];

        dbFetch.put({
            endpoint: "/moveClass",
            data: {
                userId: this.props.userData.userId,
                courseId: draggableId,
                toSem: parseInt(toSem),
                fromSem: parseInt(fromSem)
            }
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    moveClass: data
                });

                if (!(this.state.moveClass.prerequisites && this.state.moveClass.corequisites && !this.state.moveClass.dependents)) {
                    alert('Prerequisites not met: ' + this.state.moveClass.preReqsNotMet + '\nCorequisites not met: ' + this.state.moveClass.coReqsNotMet + '\nDependents: ' + this.state.moveClass.dependentCourses)
                }
                else {
                    this.fetchChecksheet();
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
        } else if (!isLoaded) {
            console.log(userData)
            return <motion.span
                style={circleStyle}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        } else {
            return (

                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >

                    {/*Using Sample Data Here*/}
                    {/*The Searchable list for homeless courses can be un commented here if needed*/}
                    {/*<SearchableList key={0} name = {"Unused Major Courses"} column={this.state.items.semesters[0]} tasks = {this.state.items.semesters[0].semesterCourses} showSearch = 'true' />*/}
                    <label style={{ fontSize: 24, backgroundColor: 10000, textAlign: "center" }}>Major : {userData.major}</label>
                    <Container>
                        <ApClasses
                            items = {this.state.userData}
                        />
                        <TransferClasses
                            items = {this.state.userData}
                        />
                        {/* <ApClasses  items = {this.state.items}/>
                        <TransferClasses  items = {this.state.items}/> */}
                        {userData.semesters.map((sem, index) => {
                            const column = sem;
                            const tasks = sem.semesterCourses;
                            const name = "Semester " + sem.semNum;
                            return <Column key={index} name={name} column={column} tasks={tasks} />
                        })}
                    </Container>
                </DragDropContext>
            );
        }

    }
}
