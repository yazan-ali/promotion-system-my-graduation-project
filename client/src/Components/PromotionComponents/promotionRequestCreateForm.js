import React, { useState, useEffect } from 'react';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form, Label } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

function PromotionRequestCreateForm({ handleCreatePromotionRequest, handleShowCreateForm, handleAlert, user, promotionType }) {

    const [values, setValues, resetValues] = useForm({});
    const [files, setFiles] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateErr, setDateErr] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (startDate && endDate) {
            const dateDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
            if (promotionType === "التثبيت") {
                if (dateDiff < 365) {
                    setDateErr("لتقديم طلب التثبيت يجب أن تمتلك سنة خدمة واحد على الأقل")
                } else {
                    setDateErr(null)
                }
            } else {
                if (dateDiff < 1582) {
                    setDateErr("لتقديم طلب الترقية يجب أن تمتلك 5 سنوات خدمة على الأقل في رتبتك الحالية")
                } else {
                    setDateErr(null)
                }
            }
        } else {
            setDateErr(null)
        }
    }, [startDate, endDate])

    const fileUpload = (file) => {
        const newFile = {
            ...file,
            uploaded_by_administrativeRank: user.administrativeRank
        }
        setFiles([...files, newFile])
    }

    const onStartDateChange = (event, data) => {
        setStartDate(data.value)
    }

    const onEndDateChange = (event, data) => {
        setEndDate(data.value)
    }

    const handleRemoveFile = (uploadId) => {
        const updatedFiles = files.filter(file => file.uploadId !== uploadId)
        setFiles(updatedFiles)
    }

    const handleSubmit = () => {
        // if (!startDate) {
        //     setDateErr("ghh")
        // }
        if (dateErr !== null) return;

        let alert;

        const newPromtionRequest = {
            example_info_1: values.example_info_1,
            user_files: files,
            start_date: startDate,
            end_date: endDate,
            current_phase_number: 1,
        }
        // axios.post("/promotionRequests", newPromtionRequest)
        axios.post("http://localhost:5000/promotionRequests", newPromtionRequest)
            .then(res => {
                if (res.data.success) {
                    alert = {
                        message: res.data.message,
                        type: "success"
                    };
                    handleCreatePromotionRequest(res.data.result,)
                    resetValues();
                } else {
                    if (Object.keys(res.data.errors).length > 0) {
                        setErrors(res.data.errors)
                        return
                    }
                    alert = {
                        message: res.data.message,
                        type: "fail"
                    }
                }
                handleAlert(alert)
            });
    }

    return (
        <div className="promotion-request-form">
            <h2>{`إنشاء طلب ${promotionType}`}</h2>
            <Button style={{ backgroundColor: "#098D9C" }}>
                <a
                    style={{ color: "#fff" }}
                    download
                    href={`${promotionType === "تثبيت" ? "https://cdn.filestackcontent.com/PAOdZt9TQD2ZyHlkLFJQ" :
                        promotionType === "ترقية أستاذ مساعد" ? "https://cdn.filestackcontent.com/X6mPbGkPQWKoNbq5oMUu" :
                            "https://cdn.filestackcontent.com/kxiXCurhTayD8SwseX0M"
                        }`} >
                    <i style={{ marginRight: 10 }} className="fas fa-book"></i> {`شروط ${promotionType}`}
                </a>
            </Button>
            <Form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                {/* <Form.Field>
                    <label>Example Info 1</label>
                    <input placeholder='Example Info 1' name="example_info_1" value={values.example_info_1} onChange={setValues} />
                </Form.Field> */}
                <p>سنة بدء الخدمة في الرتبة الحالية</p>
                {dateErr && <div>
                    <Label basic color='red' pointing>
                        {dateErr}
                    </Label>
                </div>}
                <Form.Field>
                    <label>من</label>
                    <SemanticDatepicker pointing="bottom right" onChange={onStartDateChange} />
                    {errors.start_date && <div style={{ marginTop: -10 }}>
                        <Label basic color='red' pointing>
                            {errors.start_date}
                        </Label>
                    </div>}
                </Form.Field>
                <Form.Field>
                    <label>إلى</label>
                    <SemanticDatepicker pointing="bottom right" onChange={onEndDateChange} />
                    {errors.end_date && <div style={{ marginTop: -10 }}>
                        <Label basic color='red' pointing>
                            {errors.end_date}
                        </Label>
                    </div>}
                </Form.Field>
                <FileUpload
                    label="السيرة الذاتية"
                    fileUpload={fileUpload}
                    removeFile={handleRemoveFile}
                />
                <FileUpload
                    label="البحث الأول"
                    fileUpload={fileUpload}
                    removeFile={handleRemoveFile}
                />
                <FileUpload
                    label="البحث الثاني"
                    fileUpload={fileUpload}
                    removeFile={handleRemoveFile}
                />
                {errors.files && <div style={{ paddingTop: 10 }}>
                    <Label basic color='red' pointing="right">
                        {errors.files}
                    </Label>
                </div>}
                <Button
                    onClick={() => handleShowCreateForm()}
                    style={{ width: 92, marginTop: 30, marginRight: 20 }}
                    type='button'>إلغاء</Button>
                <Button
                    style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }} primary
                    type='submit'>حفظ</Button>
            </Form>
        </div>
    )
}

export default PromotionRequestCreateForm;