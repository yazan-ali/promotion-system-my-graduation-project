import React, { useState } from 'react';
import { Button, Form, Checkbox, Search } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setMember, removeMember } from "../../state/actions/promotionCommitteeActions";

function SearchOption({ option }) {

    const [checked, setChecked] = useState(option.checked)

    const dispatch = useDispatch();

    const handleChange = (evt, data) => {

        setChecked(data.checked)

        if (data.checked) {
            dispatch(setMember(data.value))
        } else {
            dispatch(removeMember(data.value._id))
        }

    }

    return (
        <div className="search-option">
            <Checkbox checked={option.checked} value={option} onChange={handleChange} />
            <div>
                <p>{option.full_name}</p>
                <p>{option.section}</p>
                <p>{option.rank}</p>
            </div>
        </div>
    )
}

export default SearchOption;