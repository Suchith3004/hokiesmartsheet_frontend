import React, { Component } from 'react';
import DSemesterItem from "./DSemesterItem";
import {Droppable} from "react-beautiful-dnd";


class Semester extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const SemesterStyle = {
            margin: '8px',
            border: '1px solid lightgrey',
            borderRadius: '2px'
        };
        const TitleStyle = {
            padding:'8px',
        };
        const ClassesListStyle = {
            padding:'8px',
        };

        return(
            <div style={SemesterStyle}>
                <div style={TitleStyle}>
                    {this.props.semester.title};
                </div>
                <Droppable droppableId = {this.props.semester.id} >
                    {provided => (
                        <div   {...provided.droppableProps} innerRef={provided.innerRef} style={ClassesListStyle}>
                            {this.props.classes.map((dSemesterItem,index) => <DSemesterItem key = {dSemesterItem.id} dSemesterItem = {dSemesterItem} index = {index}/> )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }

}

export default Semester;
