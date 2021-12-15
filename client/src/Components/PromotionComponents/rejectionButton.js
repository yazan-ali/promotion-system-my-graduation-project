import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function RejectionButton({ id, handleShowButtons, rejectionReasons }) {

    const reject = () => {
        // axios.put(`/promotionRequests/${id}/rejection`, { rejectionReasons })
        axios.put(`http://localhost:5000/promotionRequests/${id}/rejection`, { rejectionReasons })
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
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