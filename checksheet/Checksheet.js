import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Column from "./Semester";
import CourseSelector from "./CourseSelector";
import styled from 'styled-components';
import '@atlaskit/css-reset'
import{DragDropContext} from "react-beautiful-dnd";
var dbFetch = require('../api/dbFetch')



const initialData ={
    tasks:{
        'CS2114' : {id: 'CS2114', numCredits: '3', type: 'E'},
        'CS3114' : {id: 'CS3114', numCredits: '3', type: 'E'},
        'CS4114' : {id: 'CS4114', numCredits: '3', type: 'E'},
        'CS2505' : {id: 'CS2505', numCredits: '3', type: 'E'},
        'CS2506' : {id: 'CS2506', numCredits: '3', type: 'E'},
        'CS3214' : {id: 'CS3214', numCredits: '3', type: 'E'},
        'CS1234' : {id: 'CS1234', numCredits: '3', type: 'E'},
        'CS5678' : {id: 'CS5678', numCredits: '3', type: 'E'},
        'CS9123' : {id: 'CS9123', numCredits: '3', type: 'E'},
        'CS9990' : {id: 'CS9990', numCredits: '3', type: 'E'},
        'CS9991' : {id: 'CS9991', numCredits: '3', type: 'E'},
        'CS9992' : {id: 'CS9992', numCredits: '3', type: 'E'},
        'MATH9990' : {id: 'MATH9990', numCredits: '3', type: 'E'},
        'MATH9991' : {id: 'MATH9991', numCredits: '3', type: 'E'},
        'MATH9992' : {id: 'MATH9992', numCredits: '3', type: 'E'},
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
`;
export default class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = initialData
        //this.fetchCourseInfo()
    }

    fetchCourseInfo() {
        const [course, setCourse] = useState(null);

        dbFetch.default.get({
            endpoint: "/getDefaultChecksheet",
            data: { major: "CS", gradYear: "2022" }
        })
            .then(response => response.json())
            .then(data =>
                setCourse(data)
            )
            .catch(error => console.error("Failed to fetch course. " + error.message));

        if(course) {
            //this.state =  JSON.stringify(course)
            console.log(JSON.stringify(course))
        }
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
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index,0,draggableId);

            const newColumn ={
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]:newColumn,
                },
            };
            this.setState(newState);
            return;
        }

        //Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart ={
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.in,0,draggableId);
        const newFinish ={
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]:newStart,
                [newFinish.id]:newFinish,
            },
        };
        this.setState(newState)
    };


    render(){
        return (
            <DragDropContext
                onDragStart = {this.onDragStart}
                onDragUpdate = {this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Container>
                    <CourseSelector selectorColumns={this.state.selectorColumns} columnData={this.state.columns} tasks={this.state.tasks} />
                    {this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks = {tasks} />
                    })}
                </Container>
            </DragDropContext>
        );
    }
}
