import React from "react";
import List from '../utilities/List'

export default class Pathways extends React.Component {
    constructor(props) {
        super(props);
    }

    classItem = (pathway) =>{

        return <div class="ap-item">
            <div class="course">
                <p id="courseId">{pathway.type.toLowerCase()}:</p>
                <p>{this.props.pathways[pathway.type.toLowerCase()]}</p>
            </div>
            <div id='transition'>
                <p> == </p>
            </div>
            <div class="course">
                <input type="checkbox" checked={pathway.completed} />
                <p id="courseId">{pathway.courseId}</p>
                <p>{pathway.name}</p>
                <p id="credits">{pathway.credits}</p>
            </div>
        </div>
    }

    render() {
        return <div>
            <h2 className="title">Pathways</h2>
            <div className='list-container'>
                <List elements={this.props.userPathways} getListElem={this.classItem} double={true} />
            </div>
        </div>
    }
}
