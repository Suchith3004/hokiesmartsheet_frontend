import React, {Component, useState} from 'react';
import Semester from "./Semester";
import{DragDropContext} from "react-beautiful-dnd";
var dbFetch = require('../api/dbFetch')


const initialData ={
    classes:{
        'CS2114' : {id: 'CS2114', numCredits: '3', type: 'E'},
        'CS3114' : {id: 'CS3114', numCredits: '3', type: 'E'},
        'CS4114' : {id: 'CS4114', numCredits: '3', type: 'E'},
        'CS2505' : {id: 'CS2505', numCredits: '3', type: 'E'},
        'CS2506' : {id: 'CS2506', numCredits: '3', type: 'E'},
        'CS3214' : {id: 'CS3214', numCredits: '3', type: 'E'},
    },
    semesters:{
            'semester-1':{
                id: 'semester-1',
                title: 'Semester 1',
                classIds: ['CS2114', 'CS3114', 'CS4114', 'CS2505', 'CS2506', 'CS3214']
            },
    },
    semesterOrder:['semester-1']
}

class Checksheet extends Component {
    constructor(props) {
        super(props);
        this.state = initialData
        //fetchCourseInfo()
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
            this.state =  JSON.stringify(course)
        }
    }

    onDragEnd = result =>{
        //TODO
    }

    render() {
        return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.semesterOrder.map((semesterId) =>{
            const semester = this.state.semesters[semesterId];
            const classes = semester.classIds.map(classId => this.state.classes[classId]);
            return <Semester key={semester.id} semester={semester} classes = {classes} />
        })}</DragDropContext>
        );
    }
}

export default Checksheet;
