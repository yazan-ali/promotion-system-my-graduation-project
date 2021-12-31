import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function RejectionButton({ id, handleShowButtons, rejectionReasons }) {

    const [isLoading, setIsLoading] = useState(false);

    const reject = async () => {

        setIsLoading(true)

        await axios.put(`/promotionRequests/${id}/rejection`, { rejectionReasons })
            // await axios.put(`http://localhost:5000/promotionRequests/${id}/rejection`, { rejectionReasons })
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
                }
            })

        setIsLoading(false)
    }

    return (
        <Button
            loading={isLoading}
            disabled={isLoading}
            style={{ backgroundColor: "#D1162C", color: "#fff" }}
            onClick={rejectionReasons.length > 0 && reject}>
            رفض
        </Button>
    )
}

export default RejectionButton;