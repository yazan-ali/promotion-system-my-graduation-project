import React, { useState } from 'react';
import { Form, } from 'semantic-ui-react';
import SearchOption from './searchOption';

function SearchableTextField({ placeholder, optionsList, selectOption }) {

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
            <div style={{ height: selectOption && 230 }} className="options-list">
                {
                    options && options.map(option => (
                        <SearchOption
                            key={option._id}
                            option={option}
                            selectOption={selectOption}
                        />
                    ))
                }
            </div>
        </Form>
    )
}

export default SearchableTextField;