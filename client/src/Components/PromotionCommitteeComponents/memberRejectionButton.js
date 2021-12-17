import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function MemberRejectionButton({ promotionCommitteeID, handleShowButtons, rejectionReasons }) {

    const reject = () => {
        // axios.put(`/promotionCommittee/${promotionCommitteeID}/rejection`, { rejectionReasons })
        axios.put(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}/rejection`, { rejectionReasons })
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

export default MemberRejectionButton;