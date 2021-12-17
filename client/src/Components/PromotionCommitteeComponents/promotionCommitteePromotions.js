import React from 'react';
import Info from '../UserComponents/info';

function PromotionCommitteePromotions({ promotionRequestsList, user }) {
    return (
        <div className="teachers-list">
            {
                promotionRequestsList.map(promotionRequest => (
                    <Info
                        key={promotionRequest._id}
                        teacher={promotionRequest.promotion_request.created_by}
                        promotionRequestID={promotionRequest.promotion_request_id}
                        user={user}
                        cssStyle={true}
                    />
                ))
            }
        </div>
    )
}

export default PromotionCommitteePromotions;