import React from "react";
import styled from 'styled-components';
import Task from './Class'
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    background-color:#a24857;
    padding-bottom:10px;
    align-items: center;
`;
const Title = styled.h3`
    padding: 8px;
    font-weight: bold;
    color: orange

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

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = { displayedCourses: this.props.tasks }
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {

        let searcjQery = event.target.value.toLowerCase(),
            displayedCourses = this.props.tasks.filter((el) => {
                let searchValue = el.name.toLowerCase();
                return searchValue.indexOf(searcjQery) !== -1;
            })
        this.setState({
            displayedCourses: displayedCourses
        })
    }

    render() {
        return (
            <Container>
                <Title>{this.props.name}</Title>

                <Droppable droppableId={this.props.name}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {
                                this.state.displayedCourses.map((course, index) => {
                                    return <Task key={index} task={course} index={index} />
                                })
                            }
                            {/* {this.props.tasks.map((task,index) => <Task key={task.id} task = {task} index={index}/>)} */}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>

                <Title style={{ fontsize: 0 }}>Total Credits:       {this.props.column.totalCredits}</Title>
            </Container>
        );
    }
}
