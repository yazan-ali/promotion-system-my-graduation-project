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

function PromotionRequest({ promotionRequest, handleAlert, user }) {

    const [toggleEditForm, setToggleEditForm] = useState(false);

    // const editCondition = (user.id === promotionRequest.created_by.id || user.administrativeRank === promotionRequest.current_phase_number);
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
                                <p>{promotionRequest.created_by.full_name}</p>
                                {
                                    promotionRequest.current_phase_number > 0 && (
                                        <p>
                                            {`يتم مراجعة طلبك من قبل ${ranks[promotionRequest.current_phase_number]}`}
                                        </p>
                                    )
                                }
                            </div>
                            <p>{promotionRequest.promotion_request_status}</p>
                            <div className="files-list">
                                {
                                    promotionRequest?.user_files?.file_1 && (
                                        <div>
                                            <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{promotionRequest.user_files.file_1.label}</label>
                                            <p className="file">{promotionRequest.user_files.file_1.name}</p>
                                        </div>
                                    )
                                }
                                {
                                    promotionRequest?.user_files?.file_2 && (
                                        <div>
                                            <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{promotionRequest.user_files.file_2.label}</label>
                                            <p className="file">{promotionRequest.user_files.file_2.name}</p>
                                        </div>
                                    )
                                }
                                {
                                    promotionRequest?.user_files?.file_3 && (
                                        <div>
                                            <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{promotionRequest.user_files.file_3.label}</label>
                                            <p className="file">{promotionRequest.user_files.file_3.name}</p>
                                        </div>
                                    )
                                }
                                {
                                    promotionRequest?.user_files?.file_4 && (
                                        <div>
                                            <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{promotionRequest.user_files.file_4.label}</label>
                                            <p className="file">{promotionRequest.user_files.file_4.name}</p>
                                        </div>
                                    )
                                }
                                {
                                    promotionRequest?.user_files?.file_5 && (
                                        <div>
                                            <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{promotionRequest.user_files.file_5.label}</label>
                                            <p className="file">{promotionRequest.user_files.file_5.name}</p>
                                        </div>
                                    )
                                }
                                {
                                    promotionRequest?.user_files?.file_6 && (
                                        <div>
                                            <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{promotionRequest.user_files.file_6.label}</label>
                                            <p className="file">{promotionRequest.user_files.file_6.name}</p>
                                        </div>
                                    )
                                }

                                {
                                    promotionRequest?.user_files?.researchFiles &&
                                    <div>
                                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>الأبحاث</label>
                                        {
                                            promotionRequest.user_files.researchFiles.map(file => (
                                                <p className="file" key={file.file.uploadId}>{file.file.name}</p>
                                            ))
                                        }
                                    </div>
                                }
                                <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>ملفات المشرفين</label>
                                {
                                    promotionRequest.administrative_files.map(file => (
                                        <p className="file" key={file.uploadId}>{file.name}</p>
                                    ))
                                }
                            </div>
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