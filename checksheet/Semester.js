import React from "react";
import styled from 'styled-components';
import Task from './Class'
import {Droppable} from "react-beautiful-dnd";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    background-color:#a24857;
    padding-bottom:30px;
    align-items: center;
`;
const Title = styled.h3`
    padding: 8px;
    color: aqua
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    width: 350px;x
    min-height: 100px;
    background-color:#a24857;
`;

export default class Column extends React.Component{
    render(){
        return (
            <Container>
                <Title>{this.props.name}</Title>
                {this.props.showSearch ? (
                    <input style={{width:"50%", margin:"8px"}} type="text" width="90%" placeholder="Search" />
                ) : ( <span />)}
                <Droppable droppableId = {this.props.name}>
                    {(provided,snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {
                                this.props.tasks.map((course, index) => {
                                    return <Task key={index} task = {course} index={index}/>
                                })
                            }
                            {/* {this.props.tasks.map((task,index) => <Task key={task.id} task = {task} index={index}/>)} */}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}
