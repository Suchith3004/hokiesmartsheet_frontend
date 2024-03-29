import React, { Component } from 'react';
import NavBar from '../utilities/NavBar'
import { motion } from 'framer-motion'
import dbFetch from '../api/dbFetch'


const circleStyle = {
    display: 'block',
    marginLeft: '100px',
    marginRight: '100px',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    position: 'absolute',
    boxSizing: 'border-box',
    top: '50%',
    left: '50%',
    marginTop: '-50px',
    marginLeft: '-50px',
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}


class CourseInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            courseInfo: {},
            error: null,
            pathways: this.props.pathways
        }
    }

    componentDidMount() {
        const courseId = this.props.courseId

        const splitCourse = courseId.split("-");

        dbFetch.get({
            endpoint: "/getCourseByPrefix",
            data: {
                category: splitCourse[0],
                number: splitCourse[1]
            }
        })
            .then(response => response.json())
            .then((data) => {

                this.setState({
                    isLoaded: true,
                    courseInfo: data
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

    render() {

        const { error, isLoaded, courseInfo } = this.state;
        console.log(courseInfo);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <motion.span
                style={circleStyle}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        } else {
            return (
                <div>
                    <h2 className="title">Course Info</h2>
                    <div className="courseInfo">
                        <div>
                            <p className="label">Couse ID: </p>
                            <p className="info">{courseInfo.category}-{courseInfo.number}</p>
                        </div>
                        <div>
                            <p className="label">Name: </p>
                            <p className="info">{courseInfo.name} {courseInfo.lab ? "w/ Lab" : ""}</p>
                        </div>
                        <div>
                            <p className="label">Credits: </p>
                            <p className="info">{courseInfo.credits}</p>
                        </div>
                        <div>
                            <p className="label">Type: </p>
                            <p className="info">{courseInfo.type}</p>
                        </div>
                        <div>
                            <p className="label">Min Grade: </p>
                            <p className="info">{courseInfo.minGrade ? courseInfo.minGrade : 'N/A'}</p>
                        </div>
                        <div>

                            {courseInfo.prerequisites && courseInfo.prerequisites.length > 0 ? (
                                <div>
                                    <p className="label">Prerequisites: </p>
                                    <span className='info' />
                                    {
                                        courseInfo.prerequisites.map((req, index) => {
                                            var expandedReq = req.replace("|", " or ");
                                            if (index != courseInfo.prerequisites.length - 1)
                                                expandedReq += ',';

                                            return <p className="info">{expandedReq}</p>
                                        })
                                    }
                                </div>) : <span />}
                        </div>
                        <div>
                            {courseInfo.corequisites && courseInfo.corequisites.length > 0 ? (
                                <div>
                                    <p className="label">Corequisites: </p>
                                    <span className='info' />
                                    {courseInfo.corequisites.map((req, index) => {
                                        var expandedReq = req.replace("|", " or ");
                                        if (index != courseInfo.corequisites.length - 1)
                                            expandedReq += ',';

                                        return <p className="info">{expandedReq}</p>
                                    })
                                    }
                                </div>) : <span />}
                        </div>
                        <div>
                            {courseInfo.pathways ? (
                                <div>
                                    <p className="label">Pathways: </p>
                                    <span className='info' />
                                    {
                                        courseInfo.pathways.map((Pathway, index) => {
                                            var expandedPathway = Pathway + ": " + this.state.pathways[Pathway];
                                            if (index != courseInfo.pathways.length - 1)
                                                expandedPathway += ','

                                            return <p className="info">{expandedPathway}</p>
                                        })
                                    }
                                </div>
                            ) : (<span />)}
                        </div>
                    </div>
                    <div>
                        <div className='inpageNav'>
                            {this.props.isPathway ? (
                                <button id='mainbtn' onClick={() => this.props.handleClick(this.props.courseId, null, this.props.isPathway, this.props.isElective, true)}>
                                    Change Pathway
                                </button>
                            ) : (<span />)}
                        </div>
                        <div className='inpageNav'>
                            {this.props.isElective ? (
                                <button id='mainbtn' onClick={() => this.props.handleClick(this.props.courseId, null, this.props.isPathway, this.props.isElective, true)}>
                                    Change Elective
                                </button>
                            ) : (<span />)}
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default CourseInfo;
