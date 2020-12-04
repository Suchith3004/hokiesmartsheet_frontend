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
class ElectiveSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseType: null,
            courseId: null,
            courseOptions: [],
            category: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        const courseId = this.props.electiveId;
        console.log(this.props.categories)
        for (const category of this.props.categories) {
            if (courseId.toLowerCase().includes(category.toLowerCase())) {
                this.setState({
                    category: category
                })
                this.getElectiveOptions(category)
                break;
            }
        }
    }

    assignElective = () => {
        this.setState({ isLoaded: false })
        dbFetch.put({
            endpoint: "/assignElective",
            data: {
                userId: (localStorage.getItem('userId') ? localStorage.getItem('userId') : fire.auth().currentUser.uid),
                courseType: this.state.courseType,
                courseId: this.state.courseId,
                electiveId: this.props.electiveId,
                semester: this.props.semNum,
            }
        })
            .then(() => {
                this.setState({ isLoaded: true })
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


    getElectiveOptions = (category) => {
        dbFetch.get({
            endpoint: "/getElectiveOptions/" + category,
            data: {}
        })
            .then(res => res.json())
            .then((data) => {
                const cleanedCourses = []

                data.forEach(course => {
                    console.log(course);
                    cleanedCourses.push({
                        value: course.courseId,
                        label: course.courseId + " " + course.name + "  (" + course.credits + ")"
                    })
                })

                this.setState({
                    courseOptions: cleanedCourses,
                })
            })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }


    fetchXXXOptions = async () => {

        this.setState({ isLoaded: false })
        await dbFetch.get({
            endpoint: "/autocompleteCoursePrefix",
            data: {
                category: "CS",
                number: "3"
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {

                this.setState({ courseOptions: data })

            })
            .catch((error) => {
                console.error("Failed to autocomple course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });

        await dbFetch.get({
            endpoint: "/autocompleteCoursePrefix",
            data: {
                category: "CS",
                number: "4"
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {

                const currOptions = this.state.courseOptions;

                data.forEach(course => {
                    currOptions.push(course)
                })

                this.setState({
                    isLoaded: true,
                    courseOptions: currOptions
                })

            })
            .catch((error) => {
                console.error("Failed to autocomple course. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }


    render() {

        const getCourseTypes = () => {
            return CourseTypes;
        }
        const getCourseOptions = () => {

            if (!this.props.xxxElective)
                return this.state.courseOptions;

            await this.fetchXXXOptions()
                .then(() => {
                    return this.state.courseOptions;
                })
                .catch(error => {
                    alert(error)
                })
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
                    <div> <SearchBar multiSelect={false} options={getCourseTypes} handleChange={(e) => this.setState({ courseId: null, courseType: e.value })} /> </div>
                    <br></br>

                    {this.state.courseType === 'Regular' ? (
                        <div>
                            {this.state.category ? (
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
                    {this.state.courseId && this.state.category ? (
                        <div className='inpageNav'>
                            <button id='mainbtn' onClick={() => this.assignElective()}>
                                Assign Elective
                        </button>
                        </div>
                    ) : <span />}
                </div>
            </div>
        );
    }

}

export default ElectiveSelector;
