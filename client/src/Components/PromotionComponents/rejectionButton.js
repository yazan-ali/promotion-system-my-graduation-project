import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function RejectionButton({ id, teacher_id, handleReject, handleTogglePromotionRequest, showForm, rejectionReasons }) {

    const reject = () => {
        axios.put(`/promotionRequests/${id}/rejection`)
            // axios.put(`http://localhost:5000/promotionRequests/${id}/rejection`, { rejectionReasons })
            .then(res => {
                if (res.data.success) {
                    handleReject(teacher_id)
                    handleTogglePromotionRequest()
                }
            })
    }

    return (
        <Button style={{ backgroundColor: "#D1162C", color: "#fff" }} onClick={rejectionReasons.length > 0 && reject}>
            رفض
        </Button>
    )
}

export default RejectionButton;