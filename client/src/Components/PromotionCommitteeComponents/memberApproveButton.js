import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { memberApprove } from "../../state/actions/promotionCommitteeActions"
import { useDispatch } from "react-redux";

function MemberApproveButton({ promotionCommitteeID, handleShowButtons, memberID }) {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const approve = async () => {

        setIsLoading(true)

        await axios.put(`/promotionCommittee/${promotionCommitteeID}/approve`)
            // await axios.put(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}/approve`)
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
                    dispatch(memberApprove(memberID))
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

export default MemberApproveButton;