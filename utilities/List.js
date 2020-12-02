import React, { Component } from 'react';

class List extends Component {

    render() {
        const elements = this.props.elements;
        return (

                <ul>
                    {
                        elements.map(elem => {
                            return <li
                            onClick={() => {this.props.handleClick(elem)}}
                            >{this.props.getListElem(elem)}</li>
                        })
                    }
                </ul>

        );
    }

}

export default List;
