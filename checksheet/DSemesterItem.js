import React, { Component } from 'react';
import {Draggable} from "react-beautiful-dnd";


class DSemesterItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Add Styling here
        const DSemesterItemStyle = {
            border: '1px solid lightgrey',
            borderRadius:'2px',
            padding: '8px',
            marginBottom:'8px',
        };

        //Add Html Here
        return (
            <Draggable draggableId={this.props.dSemesterItem.id} index = {this.props.index}>
                {provided => (
                    <div
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         innerRef={provided.innerRef}
                         style={DSemesterItemStyle}
                    >
                        {this.props.dSemesterItem.id}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default DSemesterItem;
