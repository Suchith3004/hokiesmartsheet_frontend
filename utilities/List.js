import React, { Component } from 'react';

class List extends Component {

    render() {
        const elements = this.props.elements;
        return (

            <ul class={this.props.double ? "double-list" : "single-list"}>
                {
                    this.props.handleClick ? (
                        elements.map(elem => {
                            return <li id={this.props.double ? '' : 'single'}
                                onClick={() => { this.props.handleClick(elem) }}
                            >{this.props.getListElem(elem)}</li>
                        })
                    ) : (
                            elements.map(elem => {
                                return <li id={this.props.double ? '' : 'single'}>
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
