import React, { useState, useEffect } from 'react';
import '../Style/promotionRequest.css';
import PromotionRequestEditForm from './promotionRequestEditForm';
import { Button, Form } from 'semantic-ui-react'
import DeleteButton from './deleteButton';
import ApproveButton from './approveButton';
import RejectionButton from './rejectionButton';
import axios from 'axios';
import FileUpload from './fileUpload';
import moment from 'moment';
import uuid from 'uuid/dist/v4';
import Accordion from './accordion'

function TeacherPromotionRequest({ promotionRequest, handleReject, handleApprove, user, handleTogglePromotionRequest }) {

    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [files, setFiles] = useState(promotionRequest.administrative_files);
    const [showRejectionReasonsForm, setShowRejectionReasonsForm] = useState(false);
    const [rejectionReasons, setRejectionReasons] = useState(promotionRequest.rejectionReasons);
    const [reason, setReason] = useState("");

    const administrativeRankCondition = (user.administrativeRank > 0 && user.administrativeRank === promotionRequest.current_phase_number);

    useEffect(() => {
        document.getElementById(promotionRequest._id).scrollIntoView({ behavior: "smooth", block: "center" })
    }, [])

    const fileUpload = (file) => {
        const newFile = {
            ...file,
            uploaded_by_administrativeRank: user.administrativeRank
        }
        setFiles([...files, newFile])
        setShowSaveBtn(true);
    }

    const fileRemove = (file_id) => {
        const updatedFiles = files.filter(file => file.uploadId !== file_id)
        setFiles(updatedFiles);
        setShowSaveBtn(true);
    }

    const handleRejectionReasonsInputChange = (evt) => {
        setReason(evt.target.value);
    }

    const addRejectionReason = () => {
        if (reason === "") return
        setRejectionReasons([...rejectionReasons, { reason, id: uuid() }])
        setReason("");
    }

    const removeRejectionReason = (id) => {
        const updatedList = rejectionReasons.filter(reason => reason.id != id)
        setRejectionReasons(updatedList)
    }

    const showForm = () => {
        setShowRejectionReasonsForm(true);
    }

    const handleSubmit = () => {
        const updatedPromotionRequest = {
            administrative_files: files
        }
        axios.put(`http://localhost:5000/promotionRequests/administrative/${promotionRequest._id}`, updatedPromotionRequest)
            // axios.put(`/promotionRequests/administrative/${promotionRequest._id}`, updatedPromotionRequest)
            .then(res => {
                if (res.data.success) {
                    setShowSaveBtn(false);
                }
            });
    }

    return (
        <div id={promotionRequest._id} className="promotion-request-card">
            <div>
                <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
                    <p>{promotionRequest.created_by.full_name}</p>
                    <p>{moment(promotionRequest.created_at).fromNow()}</p>
                </div>
                <p>{promotionRequest.example_info_1}</p>
                <p>{promotionRequest.example_info_2}</p>
                <p>{promotionRequest.promotion_request_status}</p>
                <div className="files-list">
                    {/* {
                        promotionRequest.user_files.map(file => (
                            <p className="file" key={file.uploadId}>
                                <span>{file.name}</span>
                                {
                                    file.uploaded_by_administrativeRank === user.administrativeRank && (
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => fileRemove(file.uploadId)}>
                                            <i class="fas fa-trash-alt"></i>
                                        </span>
                                    )
                                }
                            </p>
                        ))
                    } */}
                    {
                        promotionRequest.user_files.file_1 && (
                            <p className="file">{promotionRequest.user_files.file_1.name}</p>
                        )
                    }
                    {
                        promotionRequest.user_files.researchFiles.map(file => (
                            <p className="file" key={file.file.uploadId}>{file.file.name}</p>
                        ))
                    }
                    {
                        files.map(file => (
                            <p className="file" key={file.uploadId}>
                                <span>{file.name}</span>
                                {
                                    file.uploaded_by_administrativeRank === user.administrativeRank && (
                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => fileRemove(file.uploadId)}>
                                            <i class="fas fa-trash-alt"></i>
                                        </span>
                                    )
                                }
                            </p>
                        ))
                    }
                </div>
                <FileUpload fileUpload={fileUpload} doNotShowFile={true} />
                {
                    showSaveBtn && <Button type="button" style={{ backgroundColor: "#098D9C", color: "#fff", marginTop: 20 }} onClick={handleSubmit}>
                        حفظ
                    </Button>
                }
            </div>
            {
                rejectionReasons.length > 0 &&
                <Accordion
                    items={rejectionReasons}
                    removeRejectionReason={removeRejectionReason}
                    showAccordionItems={showRejectionReasonsForm}
                    isAdministrative={true}
                />
            }
            {showRejectionReasonsForm && (
                <Form style={{ paddingTop: 10 }} onSubmit={addRejectionReason}>
                    <Form.Field>
                        <input
                            style={{ textAlign: "end" }}
                            placeholder={`${rejectionReasons.length > 0 ? "إضافة سبب آخر" : "ادخل سبب الرفض"}`}
                            name="rejection_reason"
                            value={reason}
                            onChange={handleRejectionReasonsInputChange}
                        />
                    </Form.Field>
                    <Button onClick={addRejectionReason} type='button'>+</Button>
                </Form>
            )}
            <div className="btns-container">
                {
                    administrativeRankCondition && (
                        <div style={{ marginTop: 20 }}>

                            {
                                showRejectionReasonsForm ? (
                                    <RejectionButton
                                        id={promotionRequest._id}
                                        teacher_id={promotionRequest.created_by.id}
                                        handleReject={handleReject}
                                        handleTogglePromotionRequest={handleTogglePromotionRequest}
                                        // showForm={rejectionReasons.length > 0 ? null : showForm}
                                        rejectionReasons={rejectionReasons}
                                    />
                                ) : (
                                    <Button style={{ backgroundColor: "#D1162C", color: "#fff" }} onClick={showForm}>
                                        رفض
                                    </Button>
                                )
                            }
                            <ApproveButton
                                id={promotionRequest._id}
                                teacher_id={promotionRequest.created_by.id}
                                handleApprove={handleApprove}
                                handleTogglePromotionRequest={handleTogglePromotionRequest}
                            />
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default TeacherPromotionRequest;