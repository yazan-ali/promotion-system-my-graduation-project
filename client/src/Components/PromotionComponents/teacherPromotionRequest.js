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
import Accordion from './accordion';
import { useDispatch, useSelector } from "react-redux";
import { setAdministrativeFile, removeAdministrativeFile } from "../../state/actions/teacherDataActions";

function TeacherPromotionRequest({ handleShowButtons, user, showButtons }) {

    const promotionRequest = useSelector((state) => state.teacherData.promotionRequest);
    const files = promotionRequest.administrative_files;
    const dispatch = useDispatch();

    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [showRejectionReasonsForm, setShowRejectionReasonsForm] = useState(false);
    const [rejectionReasons, setRejectionReasons] = useState(promotionRequest.rejectionReasons);
    const [reason, setReason] = useState("");


    const administrativeRankCondition = (user.administrativeRank > 0 && user.administrativeRank === promotionRequest.current_phase_number);


    const fileUpload = (file, n = null) => {
        dispatch(setAdministrativeFile({
            file: { ...file, uploaded_by_administrativeRank: user.administrativeRank },
            file_num: n
        }));
        setShowSaveBtn(true);
    }

    const handleRemoveFile = (n) => {
        dispatch(removeAdministrativeFile(n));
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
        const administrative_files = {
            administrative_files: files
        }
        axios.put(`http://localhost:5000/promotionRequests/administrative/${promotionRequest._id}`, administrative_files)
            // axios.put(`/promotionRequests/administrative/${promotionRequest._id}`, administrative_files)
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

                </div>

                <label>ملفات المشرفين</label>

                {
                    user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
                        <FileUpload
                            label={files?.file_1 ? files.file_1.label : "ملف 1"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_1 && files.file_1}
                            canEdit={user.administrativeRank === 1 && promotionRequest.current_phase_number === 1}
                            n={1}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_1 && (
                        <FileUpload
                            label={files?.file_1 ? files.file_1.label : "ملف 1"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_1 && files.file_1}
                            canEdit={false}
                            n={1}
                            administrativeFile={true}
                            user={user}
                        />
                    )
                }


                {
                    user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
                        <FileUpload
                            label={files?.file_2 ? files.file_2.label : "ملف 2"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_2 && files.file_2}
                            canEdit={user.administrativeRank === 1 && promotionRequest.current_phase_number === 1}
                            n={2}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_2 && (
                        <FileUpload
                            label={files?.file_2 ? files.file_2.label : "ملف 2"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_2 && files.file_2}
                            canEdit={false}
                            n={2}
                            administrativeFile={true}
                            user={user}
                        />
                    )
                }

                {
                    user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
                        <FileUpload
                            label={files?.file_3 ? files.file_3.label : "ملف 3"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_3 && files.file_3}
                            canEdit={user.administrativeRank === 1 && promotionRequest.current_phase_number === 1}
                            n={3}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_3 && (
                        <FileUpload
                            label={files?.file_3 ? files.file_3.label : "ملف 3"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_3 && files.file_3}
                            canEdit={false}
                            n={3}
                            administrativeFile={true}
                            user={user}
                        />
                    )
                }

                {
                    user.administrativeRank === 2 && promotionRequest.current_phase_number === 2 ? (
                        <FileUpload
                            label={files?.file_4 ? files.file_4.label : "ملف 4"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_4 && files.file_4}
                            canEdit={user.administrativeRank === 2 && promotionRequest.current_phase_number === 2}
                            n={4}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_4 && (
                        <FileUpload
                            label={files?.file_4 ? files?.file_4.label : "ملف 4"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_4 && files.file_4}
                            canEdit={false}
                            n={4}
                            administrativeFile={true}
                            user={user}
                        />
                    )
                }

                {
                    user.administrativeRank === 2 && promotionRequest.current_phase_number === 2 ? (
                        <FileUpload
                            label={files?.file_5 ? files.file_5.label : "ملف 5"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_5 && files.file_5}
                            canEdit={user.administrativeRank === 2 && promotionRequest.current_phase_number === 2}
                            n={5}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_5 && (
                        <FileUpload
                            label={files?.file_5 ? files?.file_5.label : "ملف 5"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_5 && files.file_5}
                            canEdit={false}
                            n={5}
                            administrativeFile={true}
                            user={user}
                        />
                    )
                }

                {
                    user.administrativeRank === 2 && promotionRequest.current_phase_number === 2 ? (
                        <FileUpload
                            label={files?.file_6 ? files.file_6.label : "ملف 6"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_6 && files.file_6}
                            canEdit={user.administrativeRank === 2 && promotionRequest.current_phase_number === 2}
                            n={6}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_6 && (
                        <FileUpload
                            label={files?.file_6 ? files?.file_6.label : "ملف 6"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_6 && files.file_6}
                            canEdit={false}
                            n={6}
                            administrativeFile={true}
                            user={user}
                        />
                    )
                }

                {
                    showSaveBtn &&
                    <Button
                        type="button"
                        style={{ backgroundColor: "#098D9C", color: "#fff", marginTop: 20 }}
                        onClick={handleSubmit}>
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
            {showRejectionReasonsForm && showButtons && (
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
                    administrativeRankCondition && showButtons && (
                        <div style={{ marginTop: 20 }}>

                            {
                                showRejectionReasonsForm ? (
                                    <RejectionButton
                                        id={promotionRequest._id}
                                        handleShowButtons={handleShowButtons}
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
                                handleShowButtons={handleShowButtons}
                            />
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default TeacherPromotionRequest;