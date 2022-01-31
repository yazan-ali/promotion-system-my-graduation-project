import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../UserComponents/userContext';
import { Button, Form, Label } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import AddResearchFiles from './addResearchFiles';
import { useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";
import Snackbar from '../snackbar';


function PromotionRequestCreateForm(props) {

    const { user } = useContext(AuthContext);

    const [files, setFiles] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateErr, setDateErr] = useState(null);
    const [errors, setErrors] = useState({});
    const [filesErrors, setFilesErrors] = useState({});
    const [showResearchFiles, setShowResearchFiles] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [alert, setAlert] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);

    const promotionType = props.match.params.promotionType

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""
    }, [])

    useEffect(() => {

        if (startDate && endDate) {
            const dateDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
            if (promotionType === "تثبيت أستاذ مساعد") {
                if (dateDiff < 365) {
                    setDateErr("لتقديم طلب التثبيت يجب أن تمتلك سنة خدمة واحدة على الأقل")
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

    const fileUpload = (file, n = null) => {
        setFiles({ ...files, [`file_${n}`]: file })
    }

    const addResearchFiles = (researchFiles) => {
        setFiles({ ...files, researchFiles })
    }

    const handleRemoveFile = (n) => {
        const fileList = { ...files }
        delete fileList[`file_${n}`]
        setFiles({ ...fileList })
    }


    const toggleShowResearchFiles = () => {
        setShowResearchFiles(prev => !prev)
    }

    const onStartDateChange = (event, data) => {
        setStartDate(data.value)
    }

    const onEndDateChange = (event, data) => {
        setEndDate(data.value)
    }

    const checkIfCanSubmit = (val) => {
        setCanSubmit(val)
    }

    const handleAlert = (alert) => {
        setAlert(alert)
        setShowSnackbar(true);
    }

    const closeSnackbar = () => {
        setShowSnackbar(false);
    }

    const handleSubmit = async () => {

        if (dateErr !== null) return;

        if (promotionType !== "تثبيت أستاذ مساعد" && !canSubmit) return

        let alert;

        const newPromtionRequest = {
            user_files: files,
            start_date: startDate,
            end_date: endDate,
            promotion_type: promotionType,
        }

        setIsLoading(true)

        // await axios.post("/promotionRequests", newPromtionRequest)
        await axios.post("http://localhost:5000/promotionRequests", newPromtionRequest)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionRequest(res.data.result));
                    setRedirect(true)
                } else {
                    if (res.data.errors && Object.keys(res.data.errors).length > 0) {
                        setErrors({
                            start_date: res.data.errors.start_date,
                            end_date: res.data.errors.end_date
                        })
                        setFilesErrors(res.data.errors.files)
                    }
                    alert = {
                        message: res.data.message,
                        type: "fail"
                    }
                    handleAlert(alert)
                }
            });

        setIsLoading(false)
    }

    if (!user) {
        return <Redirect to="/login" />
    }

    return (
        <div style={{ width: showResearchFiles && "90%" }} className="promotion-request-form">
            {redirect && <Redirect to="/" />}
            <div style={{ display: showResearchFiles ? "" : "none" }}>
                <AddResearchFiles
                    addResearchFiles={addResearchFiles}
                    user={user}
                    fileUpload={fileUpload}
                    removeFile={handleRemoveFile}
                    toggleShowResearchFiles={toggleShowResearchFiles}
                    checkIfCanSubmit={checkIfCanSubmit}
                    promotionType={promotionType}
                    administrative_years_files={[files.file_7, files.file_8]}
                />
            </div>
            <div style={{ display: showResearchFiles ? "none" : "" }}>
                <h2>{`إنشاء طلب ${promotionType}`}</h2>
                <Button style={{ backgroundColor: "#098D9C" }}>
                    <a
                        style={{ color: "#fff" }}
                        download
                        href={`${promotionType === "تثبيت أستاذ مساعد" ? "https://cdn.filestackcontent.com/PAOdZt9TQD2ZyHlkLFJQ" :
                            promotionType === "ترقية أستاذ مشارك" ? "https://cdn.filestackcontent.com/X6mPbGkPQWKoNbq5oMUu" :
                                "https://cdn.filestackcontent.com/kxiXCurhTayD8SwseX0M"
                            }`} >
                        <i style={{ marginRight: 10 }} className="fas fa-book"></i> {`شروط ${promotionType}`}
                    </a>
                </Button>
                <Form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
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
                        label="استدعاء"
                        fileUpload={fileUpload}
                        removeFile={handleRemoveFile}
                        n={1}
                        canEdit={true}
                        err={filesErrors.file_1}
                    />

                    <FileUpload
                        label={`${promotionType === "تثبيت أستاذ مساعد" ? "طلب التثبيت" : "طلب الترقية"}`}
                        fileUpload={fileUpload}
                        removeFile={handleRemoveFile}
                        n={2}
                        canEdit={true}
                        err={filesErrors.file_2}
                    />

                    <FileUpload
                        label="السيرة الذاتية"
                        fileUpload={fileUpload}
                        removeFile={handleRemoveFile}
                        n={3}
                        canEdit={true}
                        err={filesErrors.file_3}
                    />
                    <FileUpload
                        label="تقيم الطلبة"
                        fileUpload={fileUpload}
                        removeFile={handleRemoveFile}
                        n={4}
                        canEdit={true}
                        err={filesErrors.file_4}
                    />
                    {
                        promotionType === "تثبيت أستاذ مساعد" && (
                            <>
                                <FileUpload
                                    label="البحث الأول"
                                    fileUpload={fileUpload}
                                    removeFile={handleRemoveFile}
                                    n={5}
                                    canEdit={true}
                                    err={filesErrors.file_5}
                                />
                                <FileUpload
                                    label="البحث الثاني"
                                    fileUpload={fileUpload}
                                    removeFile={handleRemoveFile}
                                    n={6}
                                    canEdit={true}
                                    err={filesErrors.file_5}
                                />
                            </>
                        )
                    }
                    {promotionType !== "تثبيت أستاذ مساعد" && (
                        <Form.Field style={{ marginTop: 20 }}>
                            <label>الأبحاث</label>
                            {
                                files.researchFiles && files.researchFiles.map(research => (
                                    research.file && <p className="file">{research.file.name}</p>
                                ))
                            }
                            <Button
                                style={{ marginRight: -4 }}
                                onClick={toggleShowResearchFiles}
                                type='button'>أضافة أبحاث</Button>
                        </Form.Field>
                    )}

                    {
                        files?.file_7 && (
                            <div>
                                <label className="file-label">السنة الإدارية الأولى</label>
                                <p className="file">
                                    {files.file_7.name}
                                </p>
                            </div>
                        )
                    }

                    {
                        files?.file_8 && (
                            <div>
                                <label className="file-label">السنة الإدارية الأولى</label>
                                <p className="file">
                                    {files.file_8.name}
                                </p>
                            </div>
                        )
                    }

                    {errors.files && <div style={{ paddingTop: 10 }}>
                        <Label basic color='red' pointing="right">
                            {errors.files}
                        </Label>
                    </div>}
                    <Button
                        style={{ width: 92, marginTop: 30, marginRight: 20 }}
                        type='button'>
                        <Link style={{ color: "#818181" }} to="/">إلغاء</Link>
                    </Button>
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }} primary
                        type='submit'>حفظ</Button>
                </Form>
            </div>
            {
                showSnackbar && (
                    <Snackbar
                        message={alert.message}
                        type={alert.type}
                        direction={"bottom"}
                        duration={5000}
                        closeSnackbar={closeSnackbar}
                    />
                )
            }
        </div >
    )
}

export default PromotionRequestCreateForm;