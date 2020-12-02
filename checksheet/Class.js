import React, { Component, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import { motion } from 'framer-motion'



const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 4px;
    margin-bottom: 4px;
    background-color: ${props => (props.isDragging ? '#00aeba' : '#00aeba')};
    display: flex;               
    flex-direction: row;          
    flex-wrap: nowrap;            
    justify-content: space-between; 
    border-radius:5px;
`;



const Handle = styled.div`
    width : 20px;
    height : 20px;
    background-color : orange;
    border-radius: 4px;
    margin-right: 8px;
`;


export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            courseInfo: props.task
        }
    }

    componentDidMount() {
        if (!(this.props.task.courseId.includes('Pathway') || this.props.task.courseId.includes('Elective') || this.props.task.courseId.includes('XXX'))) {
            const courseId = this.props.task.courseId.split('-');

            dbFetch.get({
                endpoint: "/getCourseByPrefix",
                data: {
                    category: courseId[0],
                    number: courseId[1]
                }
            })
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        courseInfo: data
                    });
                    // console.log(this.state.courseInfo)
                })
                .catch((error) => {
                    console.error("Failed to fetch course. " + error.message);
                    // this.setState({
                    //     isLoaded: true,
                    //     error
                    // });
                });
        }

    }

    onClickAction = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {

        var courseName = this.props.task.name;
        if (courseName.includes('Elective') || courseName.includes('Pathway'))
            courseName = '';

        return (
            <Draggable draggableId={this.props.task.courseId} index={this.props.index}>
                {(provided, snapshot) => (

                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        className="classHandleText"
                        onClick={this.onClickAction}
                    >
                        <Handle  {...provided.dragHandleProps} />

                        <div style={{ backgroundColor: '#00aeba' }} >
                            <p style={{ color: 'white', display: 'inline' }}>{this.props.task.courseId}   {courseName}</p>
                        </div>
                        <div style={{ backgroundColor: '#00aeba' }}>
                            <p style={{ color: 'white', display: 'inline', alignItems: 'right' }}> {this.props.task.credits}</p>
                        </div>

                    </Container>
                )}
            </Draggable>
        );
    }
}