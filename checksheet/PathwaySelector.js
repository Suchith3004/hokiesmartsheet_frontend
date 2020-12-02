import React, { Component } from 'react';
import { SearchBar } from '../utilities/SearchBar';


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
            pathwayType: null,
            courseOptions: []
        }
    }

    assignPathway() {
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
                pathways: [this.state.pathwayType]
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
                    courseOptions: cleanedCourses
                })
            })
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
            for(var pathway in this.props.pathways) {
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
                pathwayType: e.value
            })

            if (!e || !e.value)
                return

            this.getPathwayCourses()


        }

        const getCourseTypes = () => {
            return CourseTypes;
        }


        return (
            <div>
                <h2 className="title">Course Info</h2>
                <div className="courseInfo">
                    <div> <label style={{ fontSize: 15 }}>Type of class:</label></div>
                    <div> <SearchBar multiSelect={false} options={getCourseTypes} handleChange={(e) => this.setState({ courseType: e.value })} /> </div>
                    <br></br>

                    {this.state.courseType === 'Regular' ? (
                        <div>
                            <div> <label style={{ fontSize: 15 }}>Pathway Type:</label></div>
                            <div> <SearchBar multiSelect={false} options={cleanPathways} handleChange={handlePathwayChange} /> </div>
                            <br></br>
                        </div>

                    ) : (<span />)}

                    {this.state.pathwayType ? (
                        <div>
                            <div> <label style={{ fontSize: 15 }}>Course:</label></div>
                            <div> <SearchBar multiSelect={false} options={this.state.courseOptions} handleChange={(e) => this.setState({ courseId: e.value })} /> </div>
                            <br></br>
                        </div>
                    ) : <span />}

                </div>
            </div>
        );
    }

}

export default PathwaySelector;
