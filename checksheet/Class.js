
import React, {Component, useState} from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";


const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 4px;
    margin-bottom: 4px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
    display: flex;               
    flex-direction: row;          
    flex-wrap: nowrap;            
    justify-content: space-between; 
`;



const Handle = styled.div`
    width : 20px;
    height : 20px;
    background-color : orange;
    border-radius: 4px;
    margin-right: 8px;
`;
export default class Task extends React.Component {
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
                    >
                        <Handle  {...provided.dragHandleProps} />

                        
                        {/* <CoursePopup open= {open} setOpen={setOpen}/> */}

                        <div style={{ backgroundColor: 'white' }} >
                            <p style={{ color: 'black', display: 'inline' }}>{this.props.task.courseId}   {courseName}</p>s
                        </div>
                        <div style={{ backgroundColor: 'white' }}>
                            <p style={{ color: 'black', display: 'inline', alignItems: 'right' }}> {this.props.task.credits}</p>
                        </div>

                    </Container>
                )}
            </Draggable>
        );
    }
}
