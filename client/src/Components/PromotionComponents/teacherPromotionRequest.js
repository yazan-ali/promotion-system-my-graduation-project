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

function TeacherPromotionRequest({ promotionRequest, handleShowButtons, user, handleTogglePromotionRequest, showButtons }) {

    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [files, setFiles] = useState(promotionRequest.administrative_files);
    const [showRejectionReasonsForm, setShowRejectionReasonsForm] = useState(false);
    const [rejectionReasons, setRejectionReasons] = useState(promotionRequest.rejectionReasons);
    const [reason, setReason] = useState("");

    const administrativeRankCondition = (user.administrativeRank > 0 && user.administrativeRank === promotionRequest.current_phase_number);

    useEffect(() => {
        // document.getElementById(promotionRequest._id).scrollIntoView({ behavior: "smooth", block: "center" })
    }, [])

    const fileUpload = (file, n = null) => {
        const newFile = { ...file, uploaded_by_administrativeRank: user.administrativeRank }
        // setFiles({
        //     ...files, [`administrative_${user.administrativeRank}_files`]:
        //         { ...files[`administrative_${user.administrativeRank}_files`], [`file_${n}`]: newFile }
        // })
        setFiles({ ...files, [`file_${n}`]: newFile })

        // console.log({
        //     ...files, [`administrative_${user.administrativeRank}_files`]:
        //         { ...files[`administrative_${user.administrativeRank}_files`], [`file_${n}`]: newFile }
        // })
        setShowSaveBtn(true);
    }

    // const fileUpload = (file) => {
    //     const newFile = {
    //         ...file,
    //         uploaded_by_administrativeRank: user.administrativeRank
    //     }
    //     setFiles([...files, newFile])
    //     setShowSaveBtn(true);
    // }

    // const fileRemove = (file_id) => {
    //     const updatedFiles = files.filter(file => file.uploadId !== file_id)
    //     setFiles(updatedFiles);
    //     setShowSaveBtn(true);
    // }

    const handleRemoveFile = (uploadId, n) => {
        let currentFiles = { ...files }
        delete currentFiles[`file_${n}`]
        setFiles(currentFiles)
        setShowSaveBtn(true);
        // for (let file in files) {
        //     if (files[file].uploadId === uploadId) {
        //         updatedFiles = { ...updatedFiles, [`file_${n}`]: null }
        //     } else {
        //         updatedFiles = { ...updatedFiles, [`file_${n}`]: files[file] }
        //     }
        // }
        // console.log(updatedFiles)
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

                    {/* {
                        files.map(file => (
                            <p style={{ marginTop: 15 }} className="file" key={file.uploadId}>
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
                </div>


                {/* <FileUpload
                                label={files?.administrative_1_files?.file_1 ? files.administrative_1_files.file_1.label : "ملف 1"}
                                fileUpload={fileUpload}
                                // removeFile={handleRemoveFile}
                                fileData={files?.administrative_1_files?.file_1 && files.administrative_1_files.file_1}
                                n={1}
                            /> */}

                {
                    user.administrativeRank === 1 ? (
                        <FileUpload
                            label={files?.file_1 ? files?.file_1.label : "ملف 1"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_1 && files?.file_1}
                            canEdit={user.administrativeRank === 1}
                            n={1}
                        />
                    ) : files?.file_1 && (
                        <FileUpload
                            label={files?.file_1 ? files?.file_1.label : "ملف 1"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_1 && files?.file_1}
                            canEdit={false}
                            n={3}
                        />
                    )
                }


                {
                    user.administrativeRank === 1 ? (
                        <FileUpload
                            label={files?.file_2 ? files?.file_2.label : "ملف 2"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_2 && files?.file_2}
                            canEdit={user.administrativeRank === 1}
                            n={2}
                        />
                    ) : files?.file_2 && (
                        <FileUpload
                            label={files?.file_2 ? files?.file_2.label : "ملف 2"}
                            fileUpload={fileUpload}
                            // removeFile={handleRemoveFile}
                            fileData={files?.file_2 && files?.file_2}
                            canEdit={false}
                            n={2}
                        />
                    )
                }

                {
                    user.administrativeRank === 2 ? (
                        <FileUpload
                            label={files?.file_3 ? files?.file_3.label : "ملف 3"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_3 && files?.file_3}
                            canEdit={user.administrativeRank === 2}
                            n={3}
                        />
                    ) : files?.file_3 && (
                        <FileUpload
                            label={files?.file_3 ? files?.file_3.label : "ملف 3"}
                            fileUpload={fileUpload}
                            removeFile={handleRemoveFile}
                            fileData={files?.file_3 && files?.file_3}
                            canEdit={false}
                            n={3}
                        />
                    )
                }


                {/* <FileUpload
                    label={files?.administrative_2_files?.file_1 ? files.administrative_2_files.file_1.label : "ملف 1"}
                    fileUpload={fileUpload}
                    // removeFile={handleRemoveFile}
                    fileData={files?.administrative_2_files?.file_1 && files.administrative_2_files.file_1}
                    n={1}
                /> */}
                {/* <FileUpload fileUpload={fileUpload} doNotShowFile={true} /> */}
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
                                        teacher_id={promotionRequest.created_by.id}
                                        handleShowButtons={handleShowButtons}
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
                                handleShowButtons={handleShowButtons}
                                handleTogglePromotionRequest={handleTogglePromotionRequest}
                            />
                        </div>
                    )
                }
                {/* <button onClick={}>send</button> */}
            </div>
        </div >
    )
}

export default TeacherPromotionRequest;