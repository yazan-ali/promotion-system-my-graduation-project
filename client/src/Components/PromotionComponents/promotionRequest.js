import React, { useState } from 'react';
import '../Style/promotionRequest.css';
import PromotionRequestEditForm from './promotionRequestEditForm';
import { Button } from 'semantic-ui-react'
import DeleteButton from './deleteButton';
import { ranks } from '../../constants';
import RejectionReasons from './rejectionReasons';
import UserFilesList from './userFilesList';
import AdministrativeFilesList from './administrativeFilesList'

function PromotionRequest({ promotionRequest, handleAlert, user, promotionCommitteeID }) {

    const [toggleEditForm, setToggleEditForm] = useState(false);

    const editCondition = (user.id === promotionRequest.created_by.id && promotionRequest.current_phase_number === 0);

    const handleToggleEditForm = () => {
        setToggleEditForm(prevState => !prevState);
    }

    return (
        <>
            {
                toggleEditForm ? (
                    <PromotionRequestEditForm
                        handleToggleEditForm={handleToggleEditForm}
                        handleAlert={handleAlert}
                        user={user}
                    />
                ) : (
                    <div className="promotion-request-card">
                        <div>
                            <div className="promotion-request-card-header">
                                {
                                    promotionRequest.current_phase_number > 0 && !promotionCommitteeID && (
                                        <p>
                                            {`يتم مراجعة طلبك من قبل ${ranks[promotionRequest.current_phase_number]}`}
                                        </p>
                                    )
                                }
                            </div>
                            <p>{promotionRequest.promotion_request_status}</p>
                            <UserFilesList user_files={promotionRequest.user_files} />
                            <AdministrativeFilesList administrative_files={promotionRequest.administrative_files} />
                            {
                                promotionRequest.rejectionReasons.length > 0 &&
                                < RejectionReasons reasons={promotionRequest.rejectionReasons} />
                            }
                        </div>
                        <div className="btns-container">
                            {
                                editCondition && (
                                    <>
                                        <Button style={{ backgroundColor: "#098D9C" }} primary onClick={handleToggleEditForm}>
                                            Edit
                                        </Button>
                                        {
                                            user.id === promotionRequest.created_by.id && (
                                                <DeleteButton
                                                    id={promotionRequest._id}
                                                    handleAlert={handleAlert}
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default PromotionRequest;