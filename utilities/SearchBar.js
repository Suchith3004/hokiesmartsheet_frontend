import React, { Component, useState } from 'react';

import Select from 'react-select'
import AsyncSelect from 'react-select/async';


export class SearchBar extends React.Component {

    render() {

        const apList = inputValue =>
            new Promise(resolve => {
                console.log("called")

                // console.log(inputValue)
                resolve(this.props.options(inputValue))
            })

        /**
         * OPTIONS MUST BE RECIEVED IN THE FOLLOWING FORMAT:
         * {
         *      value: "unique key",
         *      lablel: "what user sees as option",
         *      color: "options hex value"
         * }
         */
        return (

            <AsyncSelect
                isMulti
                closeMenuOnSelect={false}
                cacheOptions
                defaultOptions={this.props.options('')}
                loadOptions={apList}
            />
        );
    }
}
