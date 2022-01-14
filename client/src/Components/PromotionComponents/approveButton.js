import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ranks } from "../../constants"

function ApproveButton({ id, handleShowButtons, administrativeRank, current_phase_number,
    process_level_number, administrative_files, setErrors }) {

    const [isLoading, setIsLoading] = useState(false);

    const approve = async () => {

        setIsLoading(true)

        // await axios.put(`/promotionRequests/${id}/approve`,{ current_phase_number, administrative_files, process_level_number })
        await axios.put(`http://localhost:5000/promotionRequests/${id}/approve`, { current_phase_number, administrative_files, process_level_number })
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
            إرسال الطلب إلى {current_phase_number === 3 && process_level_number === 1 ?
                ranks[5]
                :
                ranks[administrativeRank + 1]
            }
        </Button>
    )
}

export default ApproveButton;