import React from "react";
import List from '../utilities/List'

export default class TransferClasses extends React.Component {
    constructor(props) {
        super(props);
    }

    classItem(transferCourse) {
        return <div className="transfer-item">
            <input type="checkbox" checked={transferCourse.used} />

            <p>{transferCourse.courseId}</p>
            <p>{transferCourse.name}</p>
            <p id="credits">{transferCourse.credits}</p>
            {transferCourse.elective ? (
                <p id="elective-icon">E</p>) : (
                    <span />
                )}
            {transferCourse.pathway ? (
                <p id="pathway-icon">P</p>
            ) : <span />}
        </div>
    }

    render() {
        return <div>
            <h2 className="title">Transfer Courses</h2>
            <div className='list-container'>
                {this.props.transfers.length > 0 ? (
                    <List elements={this.props.transfers} getListElem={this.classItem} />
                ) : (
                        <h3 className='title'>No transfer courses have been added.</h3>
                    )}

            </div>
        </div>
    }
}
