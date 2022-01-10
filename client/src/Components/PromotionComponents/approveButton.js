import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ranks } from "../../constants"

function ApproveButton({ id, handleShowButtons, administrativeRank, current_phase_number, process_level_number }) {

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
            إرسال الطلب إلى {current_phase_number === 3 && process_level_number === 1 ?
                ranks[5]
                :
                ranks[administrativeRank + 1]
            }
        </Button>
    )
}

export default ApproveButton;