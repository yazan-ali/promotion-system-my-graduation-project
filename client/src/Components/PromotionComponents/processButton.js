import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ranks } from "../../constants"

function Process({ id, handleShowButtons, administrativeRank }) {

    const [isLoading, setIsLoading] = useState(false);

    const approve = async () => {

        setIsLoading(true)

        // await axios.put(`/promotionRequests/${id}/process_2`)
        await axios.put(`http://localhost:5000/promotionRequests/${id}/process_2`)
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
            إرسال الطلب إلى {ranks[administrativeRank - 1]}
        </Button>
    )
}

export default Process;