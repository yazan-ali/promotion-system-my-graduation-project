import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function ApproveButton({ id, handleShowButtons }) {

    const [isLoading, setIsLoading] = useState(false);

    const approve = async () => {

        setIsLoading(true)

        await axios.put(`/promotionRequests/${id}/approve`)
            // await axios.put(`http://localhost:5000/promotionRequests/${id}/approve`)
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
            style={{ backgroundColor: "#098D9C" }}
            primary
            onClick={approve}>
            قبول
        </Button>
    )
}

export default ApproveButton;