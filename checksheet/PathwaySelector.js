import React, { Component } from 'react';
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'
import CourseInfo from './CourseInfo'
import { motion } from 'framer-motion'

const circleStyle = {
    display: 'block',
    width: '7rem',
    height: '7rem',
    border: '0.5rem solid #e9e9e9',
    borderTop: '0.5rem solid #3498db',
    borderRadius: '50%',
    boxSizing: 'border-box',
    top: 0,
    left: 0
}

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
}

const CourseTypes = [
    { value: 'Regular', label: 'Regular' },
    { value: 'AP', label: 'AP' },
    { value: 'Transfer', label: 'Transfer' }

]
class PathwaySelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseType: null,
            courseId: null,
            tempPathwayType: null,
            pathwayType: null,
            courseOptions: [],
            isLoaded: false
        }
    }

    assignPathway = () => {
        
        this.setState({isLoaded: false})
        dbFetch.put({
            endpoint: "/assignPathway",
            data: {
                userId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
                courseType: this.state.courseType,
                courseId: this.state.courseId,
                pathwayType: this.state.pathwayType,
                pathwayId: this.props.pathwayId,
                semester: this.props.semNum
            }
        })
            .then(() => {
                this.setState({isLoaded: true})
                this.props.changeViewBack();
            })
            .catch((error) => {
                alert("Failed to fetch course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }


    getPathwayCourses() {

        dbFetch.put({
            endpoint: "/getCoursesByPathway",
            data: {
                pathways: [this.state.tempPathwayType]
            }
        })
            .then(res => res.json())
            .then((data) => {
                const cleanedCourses = []

                data.forEach(course => {
                    cleanedCourses.push({
                        value: course.courseId,
                        label: course.courseId + " " + course.name + "  (" + course.credits + ")"
                    })
                })

                this.setState({
                    courseOptions: cleanedCourses,
                })
            })
            .then(() => this.setState({
                pathwayType: this.state.tempPathwayType
            }))
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }


    render() {


        const cleanPathways = (inputValue) => {


            const cleanedPathways = [];
            for (var pathway in this.props.pathways) {
                if (pathway.toLowerCase().includes(inputValue.toLowerCase()) || this.props.pathways[pathway].toLowerCase().includes(inputValue.toLowerCase()) || inputValue === '' || !inputValue) {
                    cleanedPathways.push({
                        value: pathway,
                        label: pathway + ": " + this.props.pathways[pathway]
                    })
                }
            }

            return cleanedPathways;
        }


        const handlePathwayChange = (e) => {

            this.setState({
                tempPathwayType: e.value
            })

            if (!e || !e.value)
                return

            this.getPathwayCourses()


        }

        const getCourseTypes = () => {
            return CourseTypes;
        }
        const getCourseOptions = () => {
            return this.state.courseOptions;
        }

        const cleanApOptions = (inputValue) => {
            const cleanedOptions = []

            this.props.apOptions.forEach((equivalent) => {
                if (!equivalent.used)
                    cleanedOptions.push({
                        value: equivalent.equivalentId.toString(),
                        label: equivalent.apName + ' (' + equivalent.apScore + ') => ' + equivalent.vtCourseId + '-' + equivalent.vtCourseName
                    })
            })

            return cleanedOptions;
        }

        const handleChosenAp = (e) => {

            if (!e)
                return

            for (const equivalent of this.props.apOptions) {
                if (equivalent.equivalentId.toString() === e.value && !equivalent.used) {
                    this.setState({
                        courseId: equivalent.vtCourseId
                    })
                    break;
                }
            }
        }


        const cleanTransferOptions = (inputValue) => {
            const cleanedOptions = []

            this.props.transferOptions.forEach((transfer) => {
                if (!transfer.used)
                    cleanedOptions.push({
                        value: transfer.courseId,
                        label: transfer.courseId + " " + transfer.name + "  (" + transfer.credits + ")"
                    })
            })

            return cleanedOptions;
        }

        const handleChosenTransfer = (e) => {

            if (!e)
                return

            this.setState({
                courseId: e.value
            })
        }


        return (
            <div>
                { this.state.isLoaded ? (
                    <div>

                        <motion.span
                            style={circleStyle}
                            animate={{ rotate: 360 }}
                            transition={spinTransition}
                        />
                    </div>
                ) : <span />}
                <h2 className="title">Course Info</h2>
                <div >
                    <div> <label style={{ fontSize: 15 }}>Type of class:</label></div>
                    <div> <SearchBar multiSelect={false} options={getCourseTypes} handleChange={(e) => this.setState({ pathwayType: null, courseId: null, courseType: e.value })} /> </div>
                    <br></br>

                    {this.state.courseType ? (
                        <div>
                            <div> <label style={{ fontSize: 15 }}>Pathway Type:</label></div>
                            <div> <SearchBar multiSelect={false} options={cleanPathways} handleChange={handlePathwayChange} /> </div>
                            <br></br>
                        </div>
                    ) : <span />}

                    {this.state.courseType === 'Regular' ? (
                        <div>
                            {this.state.pathwayType ? (
                                <div>
                                    <div> <label style={{ fontSize: 15 }}>Course:</label></div>
                                    <div> <SearchBar options={getCourseOptions} handleChange={(e) => this.setState({ courseId: e.value })} /> </div>
                                    <br></br>
                                </div>
                            ) : <span />}
                            {this.state.courseId && this.state.courseType === 'Regular' ? (
                                <div style={{ marginTop: 50 }}>
                                    <CourseInfo courseId={this.state.courseId} pathways={this.props.pathways} isPathway={false} isElective={false} />
                                </div>
                            ) : <span />}
                        </div>
                    ) : (<span />)}

                    {this.state.courseType === 'AP' ? (
                        <div>
                            <div> <label style={{ fontSize: 15 }}>AP Course:</label></div>
                            <div> <SearchBar multiSelect={false} options={cleanApOptions} handleChange={handleChosenAp} /> </div>
                            <br></br>
                        </div>
                    ) : <span />}

                    {this.state.courseType === 'Transfer' ? (
                        <div>
                            <div> <label style={{ fontSize: 15 }}>Tranfer Course:</label></div>
                            <div> <SearchBar multiSelect={false} options={cleanTransferOptions} handleChange={handleChosenTransfer} /> </div>
                            <br></br>
                        </div>
                    ) : <span />}



                </div>
                <div style={{ marginBottom: 200 }}>
                    {this.state.courseId && this.state.pathwayType ? (
                        <div className='inpageNav'>
                            <button id='mainbtn' onClick={() => this.assignPathway()}>
                                Assign Pathway
                        </button>
                        </div>
                    ) : <span />}
                </div>
            </div>
        );
    }

}

export default PathwaySelector;
