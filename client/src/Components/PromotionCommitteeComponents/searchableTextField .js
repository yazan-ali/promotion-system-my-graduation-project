import React, { useState, useEffect } from 'react';
import { Button, Form, } from 'semantic-ui-react';
import SearchOption from './searchOption';
import axios from 'axios';

function SearchableTextField({ placeholder, optionsList }) {

    const [value, setValue] = useState("");

    let options

    if (optionsList) {
        options = optionsList.filter(option => option.full_name.toLowerCase().includes(value.toLowerCase()))
    }

    const handleInputChange = (evt) => {
        setValue(evt.target.value);
    }

    return (
        <Form className="searchable-text-field">
            <Form.Field>
                <input placeholder={placeholder} name="member" value={value} onChange={handleInputChange} />
            </Form.Field>
            <div className="options-list">
                {
                    options && options.map(option => (
                        <SearchOption
                            key={option._id}
                            option={option}
                        />
                    ))
                }
            </div>
        </Form>
    )
}

export default SearchableTextField;