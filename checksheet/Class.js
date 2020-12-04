
import React, { Component, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'



// const Container = styled.div`
//     border: 1px solid lightgrey;
//     border-radius: 2px;
//     padding: 4px;
//     margin-bottom: 4px;
//     background-color: #00aeba;
//     display: flex;               
//     flex-direction: row;          
//     flex-wrap: nowrap;            
//     justify-content: space-between; 
//     border-radius:5px;
//     width: 100%;
// `;



const Handle = styled.div`
`;


export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            courseInfo: props.task,
            completed: this.props.task.completed
        }
    }

    changeCompleteStatus() {
        dbFetch.put({
            endpoint: "/changeCourseStatus",
            data: {
                userId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
                semester: this.props.semNum,
                courseId: this.props.task.courseId
            }
        })
            .catch((error) => {
                alert("Failed to fetch course. " + error.message);
                // this.setState({
                //     isLoaded: true,
                //     error
                // });
            });

        this.setState({
            completed: !this.state.completed
        })
    }

    render() {
        var courseName = this.props.task.name;
        var courseId = this.props.task.courseId
        if (courseName.includes('Elective')){
            courseId = '';
        }

        if(courseId.includes('Pathway')) {
            courseId = 'Pathway';
            courseName = '';
        }
        return (
            <Draggable draggableId={this.props.task.courseId} index={this.props.index}>
                {(provided, snapshot) => (

                    <div
                        {...provided.draggableProps}                        
                        {...provided.dragHandleProps} 
                        ref={provided.innerRef}
                        // isdragging="false"
                        isDragging={snapshot.isDragging}
                        className="classHandleText"
                    >

                        <input type="checkbox" checked={this.state.completed} onClick={() => {this.props.alertCompleteHandler(this.props.task.courseId, this.props.semNum)}} onChange={() => { this.changeCompleteStatus() }} />
                        <div onClick={() => { this.props.courseClick(this.props.task.courseId, this.props.semNum, this.props.task.pathway, this.props.task.elective) }}>
                            <p id="courseId">{courseId}</p>
                            <p>{courseName}</p>
                            <p id="course-credits"> {this.props.task.credits}</p>
                            {this.props.task.elective ? (
                                <p id="elective-icon">E</p>) : (
                                    <span />
                                )}
                            {this.props.task.pathway ? (
                                <p id="pathway-icon">P</p>) : (
                                    <span />
                                )}
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
