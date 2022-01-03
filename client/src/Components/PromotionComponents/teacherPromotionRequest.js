import React, { useState, useEffect } from 'react';
import '../Style/promotionRequest.css';
import { Button, Form } from 'semantic-ui-react'
import ApproveButton from './approveButton';
import ProcessTowApproveButton from './processTowApproveButton';
import RejectionButton from './rejectionButton';
import axios from 'axios';
import FileUpload from './fileUpload';
import moment from 'moment';
import RejectionReasons from './rejectionReasons';
import UserFilesList from './userFilesList'
import { useDispatch, useSelector } from "react-redux";
import { setAdministrativeFile, removeAdministrativeFile, } from "../../state/actions/teacherDataActions";

function TeacherPromotionRequest({ handleShowButtons, user, showButtons }) {

    const promotionRequest = useSelector((state) => state.teacherData.promotionRequest);
    const files = promotionRequest.administrative_files;
    const dispatch = useDispatch();

    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [showRejectionReasonsForm, setShowRejectionReasonsForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const showForm = () => {
        setShowRejectionReasonsForm(true);
    }

    const handleSubmit = async () => {
        const administrative_files = {
            administrative_files: files
        }

        setIsLoading(true)

        // await axios.put(`http://localhost:5000/promotionRequests/administrative/${promotionRequest._id}`, administrative_files)
        axios.put(`/promotionRequests/administrative/${promotionRequest._id}`, administrative_files)
            .then(res => {
                if (res.data.success) {
                    setShowSaveBtn(false);
                }
            });

        setIsLoading(false)
    }

    return (
        <div className="promotion-request-card">
            <div>
                <div style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
                    <p>{moment(promotionRequest.updated_at).fromNow()}</p>
                </div>

                <UserFilesList user_files={promotionRequest.user_files} />

                {
                    user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
                        <FileUpload
                            label={files?.file_1 ? files.file_1.label : "تقرير مشترك مع العميد بخصوص طلب الترقية"}
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
                            label={files?.file_1 ? files.file_1.label : "تقرير مشترك مع العميد بخصوص طلب الترقية"}
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
                            label={files?.file_2 ? files.file_2.label : "محضر مجلس القسم بخصوص التوصية بالترقية"}
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
                            label={files?.file_2 ? files.file_2.label : "محضر مجلس القسم بخصوص التوصية بالترقية"}
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
                            label={files?.file_3 ? files.file_3.label : "كتاب تغطية من القسم إلى الكلية"}
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
                            label={files?.file_3 ? files.file_3.label : "كتاب تغطية من القسم إلى الكلية"}
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
                            label={files?.file_4 ? files.file_4.label : "محضر مجلس الكلية بخصوص التوصية بالترقية"}
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
                            label={files?.file_4 ? files?.file_4.label : "محضر مجلس الكلية بخصوص التوصية بالترقية"}
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
                            label={files?.file_5 ? files.file_5.label : "كتاب تغطية من الكلية إلى الرئيس"}
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
                            label={files?.file_5 ? files?.file_5.label : "كتاب تغطية من الكلية إلى الرئيس"}
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
                    user.administrativeRank === 5 && promotionRequest.process_level_number === 2 ? (
                        <FileUpload
                            label={files?.file_6 ? files.file_6.label : "قرار المحكمين"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_6 && files.file_6}
                            canEdit={user.administrativeRank === 5 && promotionRequest.process_level_number === 2}
                            n={6}
                            administrativeFile={true}
                            user={user}
                        />
                    ) : files?.file_6 && (
                        <FileUpload
                            label={files?.file_6 ? files?.file_6.label : "قرار المحكمين"}
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
                        loading={isLoading}
                        disabled={isLoading}
                        type="button"
                        style={{ backgroundColor: "#098D9C", color: "#fff", marginTop: 20 }}
                        onClick={handleSubmit}>
                        حفظ
                    </Button>
                }
            </div>

            <RejectionReasons
                reasons={promotionRequest.rejectionReasons}
                showForm={showRejectionReasonsForm}
                showButtons={showButtons}
                isAdministrative={true}
            />

            {
                promotionRequest.process_level_number === 2 && promotionRequest.sent_to.length > 0 && promotionRequest.current_phase_number === 5 && (
                    <div style={{ color: "green" }}>
                        <h4>: تم إرسال الطلب عبر البريد الإلكتروني إلى</h4>
                        <ul style={{ direction: "rtl", textAlign: "start" }}>
                            {
                                promotionRequest.sent_to.map((mail, idx) => (
                                    <li key={idx}>{mail}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

            <div className="btns-container">
                {
                    administrativeRankCondition && showButtons && (
                        <div style={{ marginTop: 20 }}>
                            {
                                promotionRequest.process_level_number === 1 ? (
                                    <>
                                        {showRejectionReasonsForm ? (
                                            <RejectionButton
                                                id={promotionRequest._id}
                                                handleShowButtons={handleShowButtons}
                                                rejectionReasons={promotionRequest.rejectionReasons}
                                            />
                                        ) : (
                                            <Button style={{ backgroundColor: "#D1162C", color: "#fff" }} onClick={showForm}>
                                                رفض
                                            </Button>
                                        )
                                        }
                                        < ApproveButton
                                            id={promotionRequest._id}
                                            handleShowButtons={handleShowButtons}
                                        />
                                    </>
                                ) : (
                                    <ProcessTowApproveButton
                                        id={promotionRequest._id}
                                        handleShowButtons={handleShowButtons}
                                        administrativeRank={user.administrativeRank}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default TeacherPromotionRequest;