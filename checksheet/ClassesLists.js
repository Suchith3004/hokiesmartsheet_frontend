import React, {Component, useState} from 'react';
import styled from "styled-components";
import SSDList from "./SSDList";

const Container = styled.div`
    display: flex;
`;

class ClassesLists extends Component {
    constructor(props) {
        super(props);
        this.state = props.initialData
    }

    render(){
        return (
            <Container>
                {this.state.columnOrder.map(columnId => {
                    if(!columnId.includes("column")) {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                        return <SSDList key={column.id} column={column} tasks={tasks}/>
                    }
                })}
            </Container>
        );
    }
}

export default ClassesLists;
