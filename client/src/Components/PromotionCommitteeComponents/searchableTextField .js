import React, { useState, useEffect } from 'react';
import { Button, Form, } from 'semantic-ui-react';
import SearchOption from './searchOption';
import axios from 'axios';

function SearchableTextField({ placeholder, optionsList, updateOptions, user }) {

    const [value, setValue] = useState("");
    const [options, setOptions] = useState(optionsList);

    useEffect(() => {
        filterOptions(optionsList)
    }, [value])

    const handleInputChange = (evt) => {
        setValue(evt.target.value);
    }

    const filterOptions = (options) => {
        const filteredOptions = options.filter(option => option.full_name.toLowerCase().includes(value.toLowerCase()))
        setOptions(filteredOptions)
    }

    return (
        <Form className="searchable-text-field">
            <Form.Field>
                <input placeholder={placeholder} name="member" value={value} onChange={handleInputChange} />
            </Form.Field>
            <div className="options-list">
                {
                    options.map(option => (
                        <SearchOption
                            key={option._id}
                            option={option}
                            updateOptions={updateOptions} />
                    ))
                }
            </div>
        </Form>
    )
}

export default SearchableTextField;