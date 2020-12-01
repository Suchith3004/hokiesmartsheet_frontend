import React, { Component } from 'react';
import NavBar from '../utilities/NavBar'

class List extends Component {

    render() {
        const elements = this.props.elements;
        console.log(elements)
        return (
            <div class='list-container'>
                <ul>
                    {
                        elements.map(elem => {
                            return <li>{this.props.getListElem(elem)}</li>
                        })
                    }
                </ul>
            </div>
        );
    }

}

export default List;
