import React, { Component } from 'react';

class List extends Component {

    render() {
        var key = 0
        const elements = this.props.elements;
        return (

            <ul class={this.props.double ? "double-list" : "single-list"}>
                {
                    this.props.handleClick ? (
                        elements.map(elem => {
                            key += 1;
                            return <li key={key} id={this.props.double ? '' : 'single'}
                                onClick={() => { this.props.handleClick(elem, this.props.optionalList) }}
                            >{this.props.getListElem(elem)}</li>
                        })
                    ) : (
                            elements.map(elem => {
                                key += 1;
                                return <li key={key} id={this.props.double ? '' : 'single'}>
                                    {this.props.getListElem(elem)}
                                </li>
                            })
                        )
                }
            </ul>

        );
    }

}

export default List;
