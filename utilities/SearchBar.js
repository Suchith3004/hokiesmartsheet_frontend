import React, { Component, useState } from 'react';

import  Select  from 'react-select'
// import AsyncSelect from 'react-select/async';

// export default class SearchBar extends Component {

export const SearchBar = () => {

    const { searchValue, setSearchValue } = useState('');
    const { searchList, setSearchList } = useState();

    const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        setSearchValue(inputValue);
        setSearchList(this.props.filterSearchChange(searchValue));
    };

    return (
        <Select
            isMulti
            cacheOptions
            defaultOptions={this.props.defaultOptions}
            value={searchValue}
            options={searchList}
            placeholder="Search..."
            onChange={handleInputChange}
        />
    );
}