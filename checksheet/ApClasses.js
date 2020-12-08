import React from "react";
import List from '../utilities/List'

export default class ApClasses extends React.Component {
    constructor(props) {
        super(props);
    }

    classItem(apEquivalent) {
        return <div class="ap-item">
            <div class="course">
                <p id="courseId">{apEquivalent.apAbreviation}</p>
                <p>AP {apEquivalent.apName}</p>
                <p id="credits">{apEquivalent.apScore}</p>
            </div>
            <div id='transition'>
                <p> {"<"}={">"} </p>
            </div>
            <div class="course">
                <input type="checkbox" checked={apEquivalent.used} />
                <p id="courseId">{apEquivalent.vtCourseId}</p>
                <p id="credits">{apEquivalent.credits ? apEquivalent.credits : 3}</p>
                <p>{apEquivalent.vtCourseName}</p>
                {apEquivalent.elective ? (
                    <p id="elective-icon">E</p>) : (
                        <span />
                    )}
                {apEquivalent.pathway ? (
                    <p id="pathway-icon">P</p>
                ) : <span />}
            </div>
        </div>
    }

    render() {
        return <div>
            <h2 className="title">AP Classes</h2>
            <div className='list-container'>
                {this.props.equivalents.length > 0 ? (
                    <List elements={this.props.equivalents} getListElem={this.classItem} double={true} />
                ) : (
                        <h3 className='title'>You have no AP classes</h3>
                    )}
            </div>
        </div>
    }
}
