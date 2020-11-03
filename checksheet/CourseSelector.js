import React from "react";
import styled from 'styled-components';
import Column from "./Semester";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 318px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;




export default class Table extends React.Component{
    render(){
        return (
            <Container>
                {this.props.selectorColumns.map(columnId => {
                    const column = this.props.columnData[columnId];
                    const tasks = column.taskIds.map(taskId => this.props.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks = {tasks} showSearch={true} />
                })}
            </Container>
        );
    }
}
