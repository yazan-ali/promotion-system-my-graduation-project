import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ranks } from "../../constants"

function ProcessTowApproveButton({ id, handleShowButtons, administrativeRank, current_phase_number, process_level_number }) {

    const [isLoading, setIsLoading] = useState(false);

    const approve = async () => {

        setIsLoading(true)

        await axios.put(`/promotionRequests/${id}/process_2_approve`)
            // await axios.put(`http://localhost:5000/promotionRequests/${id}/process_2_approve`)
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
            إرسال الطلب إلى {current_phase_number === 6 && process_level_number === 2 ?
                ranks[4]
                :
                ranks[administrativeRank - 1]
            }
        </Button>
    )
}

export default ProcessTowApproveButton;