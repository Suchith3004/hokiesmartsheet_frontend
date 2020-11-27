import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Column from "./Semester";
import styled from 'styled-components';
import '@atlaskit/css-reset'
import{DragDropContext} from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import ApClasses from "./ApClasses";


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    padding: 70px;
    background-color:#b04f5f;
    align-items: center;
    margin-left:150px;
    margin-top: 50px;
`;



export default class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: {}
          };
        //this.fetchCourseInfo()
    }

    componentDidMount() {

        dbFetch.get({
            endpoint: "/getUserChecksheet/92839",
            data: {}
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                  isLoaded: true,
                  items: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                  });
            });

        
      }

    onDragStart = () =>{
        let classHandles = ReactDOM.findDOMNode(this).getElementsByClassName('classHandleText');
        for (let elem of classHandles) {
            elem.style.color = "orange";
        }
    };

    onDragUpdate = () =>{
        //Implement if need changes while in drag
    };

    onDragEnd = result =>{
        let classHandles = ReactDOM.findDOMNode(this).getElementsByClassName('classHandleText');
        for (let elem of classHandles) {
            elem.style.color = "inherit";
        }
        const{destination, source, draggableId} = result;

        if(!destination){
            return;
        }
        if(destination.draggableId === source.droppableId && destination.index === source.index){
            return;
        }

        if(destination.droppableId === source.droppableId)
            return;

        
        const fromSem = source.droppableId.split(" ")[1];
        const toSem = destination.droppableId.split(' ')[1];

        dbFetch.put({
            endpoint: "/moveClass",
            data: {
                userId:'92839',
                courseId: draggableId,
                toSem: parseInt(toSem),
                fromSem: parseInt(fromSem) 
            }
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                  isLoaded: true,
                  items: data
                });
            })
            .catch((error) => {
                console.error("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                  });
            });
    };


    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                <DragDropContext
                    onDragStart = {this.onDragStart}
                    onDragUpdate = {this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >
                    {/*Using Sample Data Here*/}
                    {/*The Searchable list for homeless courses can be un commented here if needed*/}
                    {/*<SearchableList key={0} name = {"Unused Major Courses"} column={this.state.items.semesters[0]} tasks = {this.state.items.semesters[0].semesterCourses} showSearch = 'true' />*/}
                    <label style={{ fontSize: 24, backgroundColor: 10000, textAlign: "center" }}>Major : {this.state.items.major}</label>
                    <Container>
                        <ApClasses  items = {this.state.items}/>
                        {this.state.items.semesters.map((sem, index) => {
                            const column = sem;
                            const tasks = sem.semesterCourses;
                            const name =  "Semester " + sem.semNum;
                            return <Column key={index} name = {name} column={column} tasks = {tasks} />
                        })}
                    </Container>
                </DragDropContext>
            );
        }

    }
}
