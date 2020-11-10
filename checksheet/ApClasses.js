import React from "react";
import styled from 'styled-components';

const ApClassContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 4px;
    margin-bottom: 4px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
    display: flex;               
    flex-direction: row;          
    flex-wrap: nowrap;            
    justify-content: space-between; 
`;

const TaskList = styled.div`
    padding: 15px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    width: 250px;
    min-height: 50px;
    background-color:#a24857;
    margin-left: 100px;
    margin-right: 100px;
    margin-bottom: 20px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;

const Title = styled.h3`
    padding: 8px;
    color: aqua
`;

export default class ApClasses extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <TaskList>
                <Title>AP Classes I've Taken</Title>
                <ApClassContainer>
                    <b style={{ color: 'black', display: 'inline', alignItems: 'left' }}>AP Class</b>
                    <b style={{ color: 'black', display: 'inline', alignItems: 'right' }}>VT Course Number</b>
                    <b style={{ color: 'black', display: 'inline', alignItems: 'right' }}>VT Class</b>
                </ApClassContainer>
                {this.props.items.apEquivalents.map((apClass, index) => {
                    if(apClass.used){
                        return(
                            <ApClassContainer>
                                <label style={{ color: 'black', display: 'inline', alignItems: 'left' }}>{apClass.apName}</label>
                                <label style={{ color: 'black'}}>{apClass.vtCourseId}</label>
                                <label style={{ color: 'black', display: 'inline', alignItems: 'right' }}>{apClass.vtCourseName}</label>
                            </ApClassContainer>
                        )
                    }
                })}
            </TaskList>
        );
    }
}
