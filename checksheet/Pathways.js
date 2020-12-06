import React from "react";
import List from '../utilities/List'


// const pathwaysList = {
//     "1a": "Advanced/Applied Discourse",
//     "1f": "Foundational Discourse",
//     "2": "Critical Thinking in the Humanities",
//     "3": "Reasoning in the Social Sciences",
//     "4": "Reasoning in the Natural Sciences",
//     "5a": "Advanced/Applied Quantitative and Computational Thinking",
//     "5f": "Foundational Quantitative and Computational Thinking",
//     "6a": "Critique and Practice in the Arts",
//     "6d": "Critique and Practice in Design",
//     "7": "Critical Analysis of Equity and Identity in the United States",
// }


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
            <h2 className="title">Your Pathways</h2>
            <div className='list-container'>
                <List elements={this.props.userPathways} getListElem={this.classItem} double={true} />
            </div>
        </div>
    }
}
