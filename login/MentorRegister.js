import React, { Component, useState } from 'react';
import fire from './config/Fire';
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { SearchBar } from '../utilities/SearchBar';
import dbFetch from '../api/dbFetch'

import { useHistory } from 'react-router-dom';


const Container = styled.div`
padding:20px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`;
const roundedInput = styled.div`
padding:10px;
border-radius:10px;
border-top-left-radius: 25px;
`;

function SubmitButton(props) {

    let history = useHistory();
    function handleClick() {
        history.push('/createUser');
    }

    return (
        <button onClick={handleClick} style={{ marginLeft: '25px', marginBottom:'20px',  borderRadius: 10, boxShadow: 10}} className="btn btn-success">Complete Mentor Registration</button>
    );
}
class MentorRegister extends Component {
    constructor(props) {
        super(props);
    }
 numTextFields(event) {
        /*Getting the number of text fields*/
        var no = document.getElementById('numClasses').value;
        // /*Generating text fields dynamically in the same form itself*/
        for (var i = 1; i < no; i++) {
            var textfield = document.createElement('input');
            textfield.type = "text";
            textfield.value = "";
            document.getElementById('textfields').appendChild(textfield);
        }
        // console.log("hello");
    }

    render() {
        return (
            <form action="/">
                <label style={{ fontSize: 60, padding: -40 }}> Mentor Registration</label>
                <Container>
                    {/* <div> 
                        <SearchBar filterSearchChange={filterAPClasses} defaultOptions={cleanDefaultOptions}/>   
                    </div> */}
                    <div className="info">                       
                        <div>  <label htmlFor="qualities">Select the qualities you posses for a good mentor</label></div>
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15, height:150}} name="cars" id="combo" multiple>
                            <option value="Enthusiastic">Enthusiastic</option>
                            <option value="Respectful">A Respectful Attitude</option>
                            <option value="Invest">Eagerness to Invest in Others</option>
                            <option value="Honest"> The Ability to Give Honest and Direct Feedback</option>
                            <option value="Listening">Reflective Listening and Empathy</option>
                            <option value="Sponsor">Willingness to Be a Sponsor</option>
                            <option value="Availability">Availability to devote time & Spiritual Groups</option>
                            <option value="Positive">Positive outlook</option>
                            <option value="adaptability">Resilience and adaptability</option>


                        </select>
                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>

                        <div>  <label htmlFor="clubs">Select the clubs/organizations you are involved in</label></div>
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15, height:200}} name="cars" id="combo" multiple>
                            <option value="Academic Clubs">Academic Clubs</option>
                            <option value="Political Clubs">Political Clubs</option>
                            <option value="Media & Publication Groups">Media & Publication Groups</option>
                            <option value="Community Service & Social Justice">Community Service & Social Justice</option>
                            <option value="Theater & The Arts">Theater & The Arts</option>
                            <option value="CulturalClubs">Cultural Clubs</option>
                            <option value="Religious & Spiritual Groups">Religious & Spiritual Groups</option>
                            <option value="Sports & Recreation">Sports & Recreation</option>
                            <option value="Greek">Greek</option>
                            <option value="Student government">Student government</option>
                            <option value="Entrepreneurship Club">Entrepreneurship Club</option>
                            <option value="Dance">Dance</option>
                        </select>
                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>
                      
                        <div>  <label htmlFor="hobbies">Select your hobbies/interests</label></div>
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15, height:150}} name="cars" id="combo" multiple>
                            <option value="Photography">Photography</option>
                            <option value="Reading">Reading</option>
                            <option value="Gardening">Gardening</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Dance">Dance</option>
                            <option value="Painting">Painting</option>
                            <option value="Travel">Travel</option>
                            <option value="Hiking">Hiking</option>
                            <option value="Writing">Writing</option>
                            <option value="Music">Music</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Baking">Baking</option>
                            <option value="Bird">Bird Watching</option>
                            <option value="Fishing">Fishing</option>
                            <option value="Scrapbooking">Scrapbooking</option>
                            <option value="Drawing">Drawing</option>
                            <option value="Singing">Singing</option>
                            <option value="Sewing">Sewing</option>
                            <option value="Running">Running</option>
                            <option value="Knitting">Knitting</option>
                            <option value="Camping">Camping</option>
                            <option value="Origami">Origami</option>
                            <option value="Volunteering">Volunteering</option>
                            <option value="Sports">Playing Sports</option>
                            <option value="Instrument">Playing an Instrument</option>

                        </select>
                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>

                        <div>  <label htmlFor="clubs">Select the clubs/organizations you are involved in</label></div>
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15, height:150}} name="cars" id="combo" multiple>
                            <option value="Academic Clubs">Academic Clubs</option>
                            <option value="Political Clubs">Political Clubs</option>
                            <option value="Media & Publication Groups">Media & Publication Groups</option>
                            <option value="Community Service & Social Justice">Community Service & Social Justice</option>
                            <option value="Theater & The Arts">Theater & The Arts</option>
                            <option value="CulturalClubs">Cultural Clubs</option>
                            <option value="Religious & Spiritual Groups">Religious & Spiritual Groups</option>
                            <option value="Sports & Recreation">Sports & Recreation</option>
                            <option value="Greek">Greek</option>
                            <option value="Student government">Student government</option>
                            <option value="Entrepreneurship Club">Entrepreneurship Club</option>
                            <option value="Dance">Dance</option>
                        </select>
                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>

                        <div>  <label htmlFor="interest">Select why you are interested in becoming a mentor</label></div>
                        <select style={{ borderRadius: 10, width: 300, boxSizing: 100, padding: 15, height:150}} name="cars" id="combo" multiple>
                            <option value="To become a better leader">To become a better leader</option>
                            <option value="Achieve personal career gains">Achieve personal career gains </option>
                            <option value="leaders">Shape the leaders of tomorrow </option>
                            <option value="perspectives">Gain new perspectives and fresh ideas </option>
                            <option value="Change">Change someone’s world </option>
                            <option value="emotional">Exercise emotional intelligence </option>
                            <option value="productivity">Improve productivity </option>
                            <option value="Feel">Feel good about yourself </option>
                            <option value="Resume">Resume boost</option>

                        </select>
                        <small id="emailHelp" class="form-text text-muted">Hold down control to select</small>
                        <br></br>

                        <div>  <label htmlFor="missing">Please share any additional background information about yourself which can help to match you with a mentee?</label></div>
                        <div>  <input className="missing" style={{ borderRadius: 10, width: 300, boxShadow: 10, padding: 10 }} type="text" name="name" placeholder="" /></div>

                        <br></br>
                        <br></br>

                        <SubmitButton/>
                    </div>

                </Container>

            </form >

        );

    }

}

export default MentorRegister;