import React, { useState, useEffect } from 'react';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form, Label } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import RejectionReasons from './rejectionReasons';
import EditResearchFiles from './editResearchFiles';
import { useDispatch, useSelector } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";

function PromotionRequestEditForm({ handleToggleEditForm, handleAlert, user }) {

    const promotionRequest = useSelector((state) => state.promotionRequest);
    const files = promotionRequest.user_files
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [showResearchFiles, setShowResearchFiles] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const toggleShowResearchFiles = () => {
        setShowResearchFiles(prev => !prev)
    }

    const checkIfCanSubmit = (val) => {
        setCanSubmit(val)
    }

    const handleSubmit = async () => {

        if (!canSubmit) return;

        let alert;

        const updatedPromotionRequest = {
            user_files: files,
            current_phase_number: 1,
            rejectionReasons: []
        }

        setIsLoading(true)

        // await axios.put(`/promotionRequests/${promotionRequest._id}`, updatedPromotionRequest)
        await axios.put(`http://localhost:5000/promotionRequests/${promotionRequest._id}`, updatedPromotionRequest)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionRequest({ ...promotionRequest, ...updatedPromotionRequest }));
                    handleToggleEditForm()
                    alert = {
                        message: res.data.message,
                        type: "success"
                    };
                } else {
                    if (Object.keys(res.data.errors).length > 0) {
                        setErrors(res.data.errors)
                        console.log(res.data.errors)
                        return
                    }
                    alert = {
                        message: res.data.message,
                        type: "fail"
                    };
                }
                handleAlert(alert)
            });

        setIsLoading(false)
    }

    return (
        <div className="promotion-request-form">
            <div style={{ display: showResearchFiles ? "" : "none" }}>
                {
                    promotionRequest.promotion_type !== "تثبيت أستاذ مساعد" &&
                    <EditResearchFiles
                        user={user}
                        toggleShowResearchFiles={toggleShowResearchFiles}
                        checkIfCanSubmit={checkIfCanSubmit}
                        promotionType={promotionRequest.promotion_type}
                    />
                }
            </div>
            <div style={{ display: showResearchFiles ? "none" : "" }}>
                <Form onSubmit={handleSubmit}>
                    <FileUpload
                        label={files.file_1 ? files.file_1.label : "استدعاء"}
                        fileData={files.file_1 && files.file_1}
                        n={1}
                        canEdit={true}
                    />
                    <FileUpload
                        label={`${promotionRequest.promotion_type === "تثبيت أستاذ مساعد" ? "طلب التثبيت" : "طلب الترقية"}`}
                        fileData={files.file_2 && files.file_2}
                        n={2}
                        canEdit={true}
                    />
                    <FileUpload
                        label={files.file_3 ? files.file_3.label : "السيرة الذاتية"}
                        fileData={files.file_3 && files.file_3}
                        n={3}
                        canEdit={true}
                    />
                    <FileUpload
                        label={files.file_4 ? files.file_4.label : "تقيم الطلبة"}
                        fileData={files.file_4 && files.file_4}
                        n={4}
                        canEdit={true}
                    />
                    {
                        promotionRequest.promotion_type === "تثبيت أستاذ مساعد" && (
                            <>
                                <FileUpload
                                    label={files.file_5 ? files.file_5.label : "البحث الأول"}
                                    fileData={files.file_5 && files.file_5}
                                    n={5}
                                    canEdit={true}
                                />
                                <FileUpload
                                    label={files.file_6 ? files.file_6.label : "البحث الثاني"}
                                    fileData={files.file_6 && files.file_6}
                                    n={6}
                                    canEdit={true}
                                />
                            </>
                        )
                    }
                    {errors.files && <div style={{ paddingTop: 10 }}>
                        <Label basic color='red' pointing="right">
                            {errors.files}
                        </Label>
                    </div>}
                    {files.researchFiles && (
                        <div style={{ marginTop: 20 }}>
                            <p>الأبحاث</p>
                            {
                                files.researchFiles.map(research => (
                                    research.file && <p className="file">{research.file.name}</p>
                                ))
                            }
                            <Button
                                onClick={toggleShowResearchFiles}
                                type='button'>تعديل</Button>
                        </div>
                    )}
                    {
                        promotionRequest.rejectionReasons.length > 0 &&
                        < RejectionReasons reasons={promotionRequest.rejectionReasons} />
                    }

                    <Button
                        onClick={() => handleToggleEditForm()}
                        style={{ width: 92, marginTop: 30, marginRight: 20 }}
                        type='button'>إلغاء</Button>
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        style={{ width: 92, marginTop: 30, backgroundColor: "#098D9C", color: "#fff" }}
                        type='submit'>حفظ</Button>
                </Form>
            </div>
        </div >
    )
}

export default PromotionRequestEditForm;