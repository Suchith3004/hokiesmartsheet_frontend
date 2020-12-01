import React from "react";
import styled from 'styled-components';
import List from '../utilities/List'

export default class ApClasses extends React.Component {
    constructor(props) {
        super(props);
    }

    classItem(apEquivalent) {
        return <div class="list-item">
            <div class="course">
                <p>{apEquivalent.apAbreviation} {apEquivalent.apName}</p>
                <p id="credits">{apEquivalent.apScore}</p>
            </div>
            <div>
                <p> ={">"} </p>
            </div>
            <div class="course">
                <p>{apEquivalent.vtCourseId} {apEquivalent.vtCourseName}</p>
                <p id="credits">3</p>
            </div>
        </div>
    }

    render() {
        return <div>
            <h2 className="title">AP Classes</h2>
            <List elements={this.props.equivalents} getListElem={this.classItem} />
        </div>
    }
}
