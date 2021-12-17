import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function MemberApproveButton({ promotionCommitteeID, handleShowButtons }) {

    const approve = () => {
        // axios.put(`/promotionRequests/${promotionCommitteeID}/approve`)
        axios.put(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}/approve`)
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
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