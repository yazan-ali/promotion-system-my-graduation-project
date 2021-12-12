import React, { useState } from 'react';
import { Button, Form, Checkbox, Search } from 'semantic-ui-react';

function SearchOption({ option, updateOptions }) {

    const [checked, setChecked] = useState(option.checked)

    const handleChange = (evt, data) => {

        setChecked(data.checked)

        if (data.checked) {
            updateOptions({ ...data.value, checked: true });
        } else {
            updateOptions({ ...data.value, checked: false });
        }

    }

    return (
        <div className="search-option">
            <Checkbox checked={checked} value={option} onChange={handleChange} />
            <div>
                <p>{option.full_name}</p>
                <p>{option.section}</p>
                <p>{option.rank}</p>
            </div>
        </div>
    )
}

export default SearchOption;