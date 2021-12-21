import React, { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setMember, removeMember } from "../../state/actions/promotionCommitteeActions";

function SearchOption({ option, selectOption }) {


    const dispatch = useDispatch();

    const handleChange = (evt, data) => {

        const { _id, teacher_id, full_name, section, rank } = data.value

        const member = { _id, teacher_id, full_name, section, rank, memberDecision: null, rejectionReasons: [] }

        if (data.checked) {
            dispatch(setMember(member))
        } else {
            dispatch(removeMember(_id))
        }

    }

    return (
        <div style={{ justifyContent: selectOption && "end" }}
            onClick={selectOption ? () => selectOption(option) : null}
            className="search-option">
            {!selectOption && <Checkbox checked={option.checked} value={option} onChange={handleChange} />}
            <div>
                <p>{option.full_name}</p>
                <p>{option.section}</p>
                <p>{option.rank}</p>
            </div>
        </div>
    )
}

export default SearchOption;