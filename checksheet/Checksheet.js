import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Column from "./Semester";
import styled from 'styled-components';
import '@atlaskit/css-reset'
import{DragDropContext} from "react-beautiful-dnd";
import dbFetch from '../api/dbFetch'
import ApClasses from "./ApClasses";

const initialData ={
    tasks:{
        'CS2114' : {name: 'CS2114', credits: '3', type: 'E'},
        'CS3114' : {name: 'CS3114', credits: '3', type: 'E'},
        'CS4114' : {name: 'CS4114', credits: '3', type: 'E'},
        'CS2505' : {name: 'CS2505', credits: '3', type: 'E'},
        'CS2506' : {name: 'CS2506', credits: '3', type: 'E'},
        'CS3214' : {name: 'CS3214', credits: '3', type: 'E'},
        'CS1234' : {name: 'CS1234', credits: '3', type: 'E'},
        'CS5678' : {name: 'CS5678', credits: '3', type: 'E'},
        'CS9123' : {name: 'CS9123', credits: '3', type: 'E'},
        'CS9990' : {name: 'CS9990', credits: '3', type: 'E'},
        'CS9991' : {name: 'CS9991', credits: '3', type: 'E'},
        'CS9992' : {name: 'CS9992', credits: '3', type: 'E'},
        'MATH9990' : {name: 'MATH9990', credits: '3', type: 'E'},
        'MATH9991' : {name: 'MATH9991', credits: '3', type: 'E'},
        'MATH9992' : {name: 'MATH9992', credits: '3', type: 'E'},
    },
    columns:{
        'column-1':{
            id: 'column-1',
            title: 'Semester 1',
            taskIds: ['CS2114', 'CS3114', 'CS4114',],
        },
        'column-2':{
            id: 'column-2',
            title: 'Semester 2',
            taskIds: [ 'CS2505', 'CS2506', 'CS3214'],
        },
        'column-3':{
            id: 'column-3',
            title: 'Semester 3',
            taskIds: [ 'CS1234', 'CS5678', 'CS9123'],
        },
        'major-selection':{
            id: 'major-selection',
            title: 'Major Selection',
            taskIds: ['CS9990', 'CS9991', 'CS9992',],
        },
        'minor-selection':{
            id: 'minor-selection',
            title: 'Minor Selection',
            taskIds: ['MATH9990', 'MATH9991', 'MATH9992',],
        }
    },
    columnOrder:['column-1','column-2','column-3'],
    selectorColumns:['major-selection', 'minor-selection'],
};


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
