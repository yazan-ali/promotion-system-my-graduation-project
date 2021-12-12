import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

function RejectionButton({ id, teacher_id, handleShowButtons, handleTogglePromotionRequest, showForm, rejectionReasons }) {

    const [redirect, setRedirect] = useState(false)

    const reject = () => {
        // axios.put(`/promotionRequests/${id}/rejection`, { rejectionReasons })
        axios.put(`http://localhost:5000/promotionRequests/${id}/rejection`, { rejectionReasons })
            .then(res => {
                if (res.data.success) {
                    // handleReject(teacher_id)
                    // handleTogglePromotionRequest()
                    // setRedirect(true)
                    handleShowButtons()
                }
            })
    }

    return (
        <>
            {redirect && < Redirect to="/" />}
            <Button style={{ backgroundColor: "#D1162C", color: "#fff" }} onClick={rejectionReasons.length > 0 && reject}>
                رفض
            </Button>
        </>
    )
}

export default RejectionButton;