import React, { Component, useState } from 'react';
// import fire from './config/Fire';
var dbFetch = require('../api/dbFetch')

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {}
        }

        const subject = this.props.name.split(' ')[0];
        const number = this.props.name.split(' ')[1];



        // this.state = {
        //     course: fetchCourseInfo()
        // }
    }

    // fetchCourseInfo() {
    //
    //     const [course, setCourse] = useState(null);
    //
    //     dbFetch.default.get({
    //         endpoint: "/getCourseByPrefix",
    //         data: { category: subject, number: number }
    //     })
    //         .then(response => response.json())
    //         .then(data =>
    //             setCourse(data)
    //         )
    //         .catch(error => console.error("Failed to fetch course. " + error.message));
    //
    //     if(course) {
    //         return <div>
    //             {JSON.stringify(course)}
    //         </div>
    //     }
    //
    //     return null;
    // }

    render() {
        return (
            <div>
                <this.fetchCourseInfo/>
            </div>
        );

    }

}

export default Course;
