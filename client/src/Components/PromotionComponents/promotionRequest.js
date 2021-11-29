import React, { useState, useEffect } from 'react';
import '../Style/promotionRequest.css';
import PromotionRequestEditForm from './promotionRequestEditForm';
import { Button } from 'semantic-ui-react'
import DeleteButton from './deleteButton';
import ApproveButton from './approveButton';
import RejectionButton from './rejectionButton';
import axios from 'axios';
import FileUpload from './fileUpload';
import { ranks } from '../../constants';
import Accordion from './accordion';

function PromotionRequest({ promotionRequest, handleUpdatePromotionRequest, handleDeletePromotionRequest, handleAlert, user }) {

    const [toggleEditForm, setToggleEditForm] = useState(false);

    // const editCondition = (user.id === promotionRequest.created_by.id || user.administrativeRank === promotionRequest.current_phase_number);
    const editCondition = (user.id === promotionRequest.created_by.id && promotionRequest.current_phase_number === 0);

    const handleToggleEditForm = () => {
        setToggleEditForm(prevState => !prevState);
    }

    const updatePromotionRequest = (id, updatedPromotionRequest) => {
        handleUpdatePromotionRequest(id, updatedPromotionRequest)
        handleToggleEditForm();
    }

    return (
        <>
            {
                toggleEditForm ? (
                    <PromotionRequestEditForm
                        promotionRequestData={promotionRequest}
                        handleUpdatePromotionRequest={updatePromotionRequest}
                        handleToggleEditForm={handleToggleEditForm}
                        handleAlert={handleAlert}
                        user={user}
                    />
                ) : (
                    <div className="promotion-request-card">
                        <div>
                            <div className="promotion-request-card-header">
                                <p>{promotionRequest.created_by.full_name}</p>
                                {
                                    promotionRequest.current_phase_number > 0 && (
                                        <p>
                                            {`يتم مراجعة طلبك من قبل ${ranks[promotionRequest.current_phase_number]}`}
                                        </p>
                                    )
                                }
                            </div>
                            <p>{promotionRequest.example_info_1}</p>
                            <p>{promotionRequest.example_info_2}</p>
                            <p>{promotionRequest.promotion_request_status}</p>
                            <div className="files-list">
                                {
                                    promotionRequest.user_files.map(file => (
                                        <p className="file" key={file.uploadId}>{file.name}</p>
                                    ))
                                }
                                {
                                    promotionRequest.administrative_files.map(file => (
                                        <p className="file" key={file.uploadId}>{file.name}</p>
                                    ))
                                }
                            </div>
                            {/* <div>
                                {
                                    promotionRequest.rejectionReasons.map(reason => (
                                        <p className="rejection-reason" key={reason.id}>{reason.reason}</p>
                                    ))
                                }
                            </div> */}
                            {
                                promotionRequest.rejectionReasons.length > 0 &&
                                < Accordion items={promotionRequest.rejectionReasons} />
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
                                                    handleDeletePromotionRequest={handleDeletePromotionRequest}
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