import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function ApproveButton({ id, handleShowButtons }) {

    const approve = () => {
        // axios.put(`/promotionRequests/${id}/approve`)
        axios.put(`http://localhost:5000/promotionRequests/${id}/approve`)
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

export default ApproveButton;