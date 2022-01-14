import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ranks } from "../../constants"

function ProcessTowApproveButton({ id, handleShowButtons, administrativeRank, current_phase_number, process_level_number,
    administrative_files, setErrors }) {

    const [isLoading, setIsLoading] = useState(false);

    const approve = async () => {

        setIsLoading(true)

        // await axios.put(`/promotionRequests/${id}/process_2_approve`, { current_phase_number, administrative_files, process_level_number })
        await axios.put(`http://localhost:5000/promotionRequests/${id}/process_2_approve`, { current_phase_number, administrative_files, process_level_number })
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
                } else {
                    setErrors(res.data.errors.files)
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