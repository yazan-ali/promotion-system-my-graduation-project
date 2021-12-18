import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { memberApprove } from "../../state/actions/promotionCommitteeActions"
import { useDispatch, useSelector } from "react-redux";

function MemberApproveButton({ promotionCommitteeID, handleShowButtons, memberID }) {

    const dispatch = useDispatch();

    const approve = () => {
        // axios.put(`/promotionRequests/${promotionCommitteeID}/approve`)
        axios.put(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}/approve`)
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
                    dispatch(memberApprove(memberID))
                }
            })
    }

    return (
        <Button style={{ backgroundColor: "#098D9C" }} primary onClick={approve}>
            قبول
        </Button>
    )
}

export default MemberApproveButton;