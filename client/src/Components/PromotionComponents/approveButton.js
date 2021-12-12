import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

function ApproveButton({ id, teacher_id, handleShowButtons, handleTogglePromotionRequest }) {

    const [redirect, setRedirect] = useState(false)

    const approve = () => {
        // axios.put(`/promotionRequests/${id}/approve`)
        axios.put(`http://localhost:5000/promotionRequests/${id}/approve`)
            .then(res => {
                if (res.data.success) {
                    // handleApprove(teacher_id)
                    // setRedirect(true)
                    handleShowButtons()
                    // handleTogglePromotionRequest()
                }
            })
    }

    return (
        <>
            {redirect && < Redirect to="/" />}
            <Button style={{ backgroundColor: "#098D9C" }} primary onClick={approve}>
                قبول
            </Button>
        </>
    )
}

export default ApproveButton;