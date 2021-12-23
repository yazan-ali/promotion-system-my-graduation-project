import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { memberReject } from "../../state/actions/promotionCommitteeActions"

function MemberRejectionButton({ promotionCommitteeID, handleShowButtons, rejectionReasons, memberID }) {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const reject = async () => {

        setIsLoading(true)

        //await axios.put(`/promotionCommittee/${promotionCommitteeID}/rejection`, { rejectionReasons })
        await axios.put(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}/rejection`, { rejectionReasons })
            .then(res => {
                if (res.data.success) {
                    handleShowButtons()
                    dispatch(memberReject(memberID))
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

export default MemberRejectionButton;