import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Task from "./Class";
import styled from "styled-components";


const Container = styled.div`
    margin: 2px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 360px;
    height: 250px;
    display: flex;
    flex-direction: column;
    background-color:#a24857;
    align-items: center;
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

const Title = styled.h3`
    padding: 8px;
    color: aqua
`;

const SearchBarStyle = styled.h3`
    padding-bottom: 5px;
    color: aqua
`;
export default class SearchableList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {displayedCourses: this.props.tasks}
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler (event) {
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
        return (
            <Container>
                <Title>{this.props.name}</Title>
                <Droppable droppableId = {this.props.name}>
                    {(provided,snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <SearchBarStyle>
                            <input type="text" className="search" placeholder="Class Name" onChange={this.searchHandler}/>
                            </SearchBarStyle>
                            {
                                this.state.displayedCourses.map((course, index) => {
                                    return <Task key={index} task = {course} index={index}/>
                                })
                            }
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }

}
