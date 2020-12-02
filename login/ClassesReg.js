import React, { Component, useState } from 'react';
import styled from "styled-components";
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'


const Container = styled.div`
padding:20px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`;
const roundedInput = styled.div`
padding:10px;
border-radius:10px;
border-top-left-radius: 25px;
`;

class ClassesReg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            apEquivalents: [],
            chosenAP: [],
            courseOptions: [],
            chosenCourses: [],
            majors: [],
            chosenMajor: null,
            schools: [],
            chosenSchool: null,
            gradYear: 2022
        }

    }


    componentDidMount() {
        dbFetch.get({
            endpoint: "/getAllAPEquivalents",
            data: {}
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    apEquivalents: data
                })
            })
            .catch((error) => {
                console.error("Failed to fetch apEquivalents. " + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            })

        dbFetch.get({
            endpoint: "/getAllMajors",
            data: {}
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    majors: data
                })
            })
            .catch((error) => {
                console.error("Failed to fetch available majors." + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });

        dbFetch.get({
            endpoint: "/getAllSchools",
            data: {}
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    schools: data
                })
            })
            .catch((error) => {
                console.error("Failed to fetch available majors." + error.message);
                this.setState({
                    isLoaded: true,
                    error
                });
            });


    }

    componentDidUpdate(prevProps) {
        if (this.props.submitted != prevProps.submitted && this.props.submitted != false) {
            if (!this.state.chosenMajor || !this.state.chosenSchool) {
                this.props.submit(null, 'student');
            }
            else {
                const newUser = {
                    major: this.state.chosenMajor,
                    school: this.state.chosenSchool,
                    gradYear: this.state.gradYear,
                    apEquivalents: this.state.chosenAP,
                    transferCredits: this.state.chosenCourses
                }
                this.props.submit(newUser, 'student');
            }
        }
    }

    async autocompleteCourse(coursePrefix) {

        const abbreviation = coursePrefix.split(' ')[0].split('-');
        const query = {
            category: abbreviation[0].toUpperCase(),
            number: (abbreviation.length == 2) ? abbreviation[1] : ''
        }

        await dbFetch.get({
            endpoint: "/autocompleteCoursePrefix",
            data: query
        })
            .then((response) => {
                return response.json()
            })
            .then((options) => {
                dbFetch.get({
                    endpoint: "/autocompleteCourseName/" + coursePrefix,
                    data: {}
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {

                        const courseOptions = options;

                        data.forEach(item => {
                            if (data.indexOf(item) < 0)
                                courseOptions.push(item)
                        })


                        this.setState({
                            isLoaded: true,
                            courseOptions: courseOptions
                        })

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

        const cleanApEquivalents = (inputValue) => {
            if (!this.state) {
                return [];
            }

            const cleanedEquivalents = []
            this.state.apEquivalents.forEach(equivalent => {
                const name = equivalent.apName.toLowerCase().includes(inputValue.toLowerCase());
                const courseId = equivalent.vtCourseId.toLowerCase().includes(inputValue.toLowerCase());
                const courseName = equivalent.vtCourseName.toLowerCase().includes(inputValue.toLowerCase());

                if (!inputValue || inputValue === '' || name || courseId || courseName) {
                    cleanedEquivalents.push({
                        value: equivalent.equivalentId.toString(),
                        label: equivalent.apName + ' (' + equivalent.apScore + ') => ' + equivalent.vtCourseId + '-' + equivalent.vtCourseName
                    })
                }
            })
            return cleanedEquivalents;
        }

        const handleChosenAp = (e) => {
            if (!e)
                return
            const chosenAP = [];

            e.forEach(item => chosenAP.push(parseInt(item.value)));

            this.state.chosenAP = chosenAP;
        }

        const cleanMajors = (inputValue) => {
            if (!this.state) {
                return [];
            }

            const cleanedMajors = []

            for (var key in this.state.majors) {
                if (key.toLowerCase().includes(inputValue.toLowerCase()) || this.state.majors[key].toLowerCase().includes(inputValue.toLowerCase())) {
                    cleanedMajors.push({
                        value: key,
                        label: key + '-' + this.state.majors[key]
                    });
                }
            }
            return cleanedMajors ? cleanedMajors : null;
        }

        const handleChosenMajor = (e) => {
            if (!e)
                return
            this.state.chosenMajor = e.value
        }

        const cleanSchools = (inputValue) => {
            if (!this.state) {
                return [];
            }

            const cleanedSchools = [];
            this.state.schools.forEach(school => {
                if (school.toLowerCase().includes(inputValue.toLowerCase()) || inputValue === '' || !inputValue) {
                    cleanedSchools.push({
                        value: school,
                        label: school
                    })
                }
            })

            return cleanedSchools;
        }

        const handleChosenSchool = (e) => {
            if (!e)
                return
            this.state.chosenSchool = e.value
        }

        const cleanCourses = async (inputValue) => {
            if (!this.state ) {
                return [];
            }
            
            var options;
            if(inputValue && inputValue !== '')
                options = await this.autocompleteCourse(inputValue);

            const cleanedCourses = [];
            this.state.courseOptions.forEach(course => {
                cleanedCourses.push({
                    value: course.abbreviation,
                    label: course.abbreviation + ' ' + course.name
                })
            })

            return cleanedCourses;
        }

        const handleChosenCourses = (e) => {
            if (!e)
                return
            const chosenCourses = [];

            e.forEach(item => chosenCourses.push(item.value));

            this.state.chosenCourses = chosenCourses;
        }

        const cleanGradYear = (inputValue) => {
            if (!this.state)
                return []

            var yearOptions = [];

            for (var i = 0; i < 1; i++) {
                yearOptions.push({
                    value: (2022 + i).toString(),
                    label: 2022 + i
                });
            }

            return yearOptions;
        }

        const handleChosenGradYear = (e) => {
            if (!e)
                return

            this.setState({
                gradYear: parseInt(e.value)
            });
        }


        return (

            <form action="/">
                <u><label style={{ fontSize: 30, padding: -40 }}><u>Student Registration</u></label></u>
                <Container>
                    <div className="info">

                        <div> <label style={{ fontSize: 15 }}>School:</label></div>
                        <div> <SearchBar multiSelect={false} options={cleanSchools} handleChange={handleChosenSchool} /> </div>
                        <br></br>

                        <br></br>
                        <div> <label style={{ fontSize: 15 }}>Major:</label></div>
                        <div> <SearchBar multiSelect={false} options={cleanMajors} handleChange={handleChosenMajor} /> </div>
                        <br></br>

                        <br></br>
                        <div> <label style={{ fontSize: 15 }}>Graduation Year:</label></div>
                        <div> <SearchBar multiSelect={false} options={cleanGradYear} handleChange={handleChosenGradYear} /> </div>
                        <br></br>

                        <br></br>
                        <div> <label style={{ fontSize: 15 }}>Select all the AP classes you have completed:</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanApEquivalents} handleChange={handleChosenAp} /> </div>
                        <br></br>

                        <br></br>
                        <div> <label style={{ fontSize: 15 }}>Select all the  courses you have completed:</label></div>
                        <div> <SearchBar multiSelect={true} options={cleanCourses} handleChange={handleChosenCourses} /> </div>
                        <br></br>

                    </div>

                </Container>

            </form >






        );

    }

}
export default ClassesReg;