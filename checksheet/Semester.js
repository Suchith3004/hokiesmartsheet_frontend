import React from "react";
import styled from 'styled-components';
import Task from './Class'
import { Droppable } from "react-beautiful-dnd";

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'white' : 'white')};
    flex-grow: 1;
    width: 400px;
    min-height: 100px;
    background-color:white;
    margin-top: 15px;
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

    render(){

        const height = (this.props.height) * 30 + 200
        return (
            <div class='semester' height={height}>
                <h2 id="totalcredits">{this.props.name}</h2 >
                <Droppable droppableId = {this.props.name}>
                    {(provided,snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {
                                this.state.displayedCourses.map((course, index) => {
                                    return <Task key={index} task={course} index={index} semNum={this.props.semNum} courseClick={this.props.courseClick} alertCompleteHandler={this.props.alertCompleteHandler}/>
                                })
                            }
                            {/* {this.props.tasks.map((task,index) => <Task key={task.id} task = {task} index={index}/>)} */}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
                <h3 id='totalcredits'>Total Credits:       {this.props.column.totalCredits}</h3>
            </div>
        );
    }
}