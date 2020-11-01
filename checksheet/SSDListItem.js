import React, { Component } from 'react';

class SSDListItem extends Component {
    constructor(props) {
        super(props);
        this.state = ({ //puts user in a state
            //Test to display item
            name: "CS 2114",
        });
    }

    render() {
        //Add Styling here
        const SSDListItemStyle = {
            color: "black",
            backgroundColor: "IndianRed",
            padding: "10px",
            fontFamily: "Arial",
            borderRadius: "5px",
            width: "10%",
            textAlign: "center",
        };

        //Add Html Here
        return (
            <div style={SSDListItemStyle}>{this.state.name}</div>
        );
    }
}

export default SSDListItem;

