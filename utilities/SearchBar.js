import React, { Component, useState } from 'react';

import Select from 'react-select'
import AsyncSelect from 'react-select/async';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid white',
        color: state.isSelected ? 'black' : 'white',
        backgroundColor: state.isSelected
            ? 'lightgrey'
            : state.isFocused
                ? 'lightblue'
                : null
    }),
    menu: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted black',
        padding: 2
    }),
    // control: styles => ({ ...styles, backgroundColor: 'white' }),

    singleValue: (styles) => ({
        ...styles,
        color: 'white',
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: "black",
        backgroundColor: 'lightgrey',
        borderRadius: '10px'
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: 'black',
        backgroundColor: 'lightgrey',
        ':hover': {
            backgroundColor: 'grey',
            color: 'black',
        },
        borderRadius: '10px'
    }),
    control: (base) => ({
        ...base,
        borderRadius: '10px',
        boxSizing: 'border - box',
        wordWrap: "break-word"
    }),
    container: (provided) => ({
        ...provided,
        textOverflow: "ellipsis",
    })
}



export class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const apList = inputValue =>
            new Promise(resolve => {
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
            <div>
                {this.props.multiSelect ?
                    (<AsyncSelect
                        isMulti
                        closeMenuOnSelect={false}
                        cacheOptions
                        defaultOptions={this.props.options('')}
                        loadOptions={apList}
                        onChange={this.props.handleChange}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: 'lightblue',
                                primary: 'grey',
                            },
                        })}
                        styles={customStyles}
                    />) :
                    (<AsyncSelect
                        cacheOptions
                        defaultOptions={this.props.options('')}
                        loadOptions={apList}
                        onChange={this.props.handleChange}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: 'lightblue',
                                primary: 'grey',
                            },
                        })}
                        styles={customStyles}
                    />)
                }
            </div>
        );
    }
}
