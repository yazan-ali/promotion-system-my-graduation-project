import React, { useState, useEffect } from 'react';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form, Label } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import Accordion from './accordion';
import EditResearchFiles from './editResearchFiles';

function PromotionRequestEditForm({ promotionRequestData, handleUpdatePromotionRequest, handleToggleEditForm, handleAlert, user }) {

    const [promotionRequest, setPromotionRequest] = useState(promotionRequestData);
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState(promotionRequestData.user_files);
    const [showResearchFiles, setShowResearchFiles] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    // useEffect(() => {
    //     if (startDate && endDate) {
    //         const dateDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    //         if (promotionType === "تثبيت") {
    //             if (dateDiff < 365) {
    //                 setDateErr("لتقديم طلب التثبيت يجب أن تمتلك سنة خدمة واحد على الأقل")
    //             } else {
    //                 setDateErr(null)
    //             }
    //         } else {
    //             if (dateDiff < 1582) {
    //                 setDateErr("لتقديم طلب الترقية يجب أن تمتلك 5 سنوات خدمة على الأقل في رتبتك الحالية")
    //             } else {
    //                 setDateErr(null)
    //             }
    //         }
    //     } else {
    //         setDateErr(null)
    //     }
    // }, [startDate, endDate])

    const fileUpload = (file) => {
        setFiles([...files, file])
    }

    const addResearchFiles = (researchFiles) => {
        setFiles({ ...files, researchFiles })
    }

    const handleRemoveFile = (uploadId) => {
        const updatedFiles = files.filter(file => file.uploadId !== uploadId)
        setFiles(updatedFiles)
    }

    const toggleShowResearchFiles = () => {
        setShowResearchFiles(prev => !prev)
    }

    const checkIfCanSubmit = (val) => {
        setCanSubmit(val)
    }

    const handleSubmit = () => {

        if (!canSubmit) return;

        let alert;

        const updatedPromotionRequest = {
            user_files: files,
            rejectionReasons: []
        }
        // axios.put(`/promotionRequests/${promotionRequest._id}`, updatedPromotionRequest)
        axios.put(`http://localhost:5000/promotionRequests/${promotionRequest._id}`, updatedPromotionRequest)
            .then(res => {
                if (res.data.success) {
                    handleUpdatePromotionRequest(promotionRequest._id,
                        {
                            ...promotionRequest,
                            ...updatedPromotionRequest,
                            current_phase_number: 0
                        })
                    setPromotionRequest({ ...promotionRequest, ...updatedPromotionRequest });
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
    }

    return (
        <div className="promotion-request-form">
            <div style={{ display: showResearchFiles ? "" : "none" }}>
                <EditResearchFiles
                    addResearchFiles={addResearchFiles}
                    user={user}
                    researchFilesData={files.researchFiles}
                    toggleShowResearchFiles={toggleShowResearchFiles}
                    checkIfCanSubmit={checkIfCanSubmit}
                />
            </div>
            <div style={{ display: showResearchFiles ? "none" : "" }}>
                <Form onSubmit={handleSubmit}>
                    <FileUpload
                        label="البحث الأول"
                        fileUpload={fileUpload}
                        removeFile={handleRemoveFile}
                        fileData={files.file_1}
                    />
                    {errors.files && <div style={{ paddingTop: 10 }}>
                        <Label basic color='red' pointing="right">
                            {errors.files}
                        </Label>
                    </div>}
                    {/* {
                    files.researchFiles.map(research => (
                        
                    ))
                } */}
                    {/* <div className="files-list">
                    {
                        files.map(file => (
                            <p className="file" key={file.uploadId}>
                                <span>{file.name}</span>
                                {
                                    file.uploaded_by_administrativeRank === user.administrativeRank && <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleRemoveFile(file.uploadId)}>
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                }
                            </p>
                        ))
                    }
                </div> */}

                    {/* <FileUpload fileUpload={fileUpload} /> */}
                    {files.researchFiles && (
                        <div style={{ marginTop: 20 }}>
                            {
                                files.researchFiles.map(research => (
                                    <p className="file">{research.file.name}</p>
                                ))
                            }
                            <Button
                                onClick={toggleShowResearchFiles}
                                type='button'>تعديل الأبحاث</Button>
                        </div>
                    )}
                    {
                        promotionRequest.rejectionReasons.length > 0 &&
                        < Accordion items={promotionRequest.rejectionReasons} />
                    }

                    <Button
                        onClick={() => handleToggleEditForm()}
                        style={{ width: 92, marginTop: 30, marginRight: 20 }}
                        type='button'>إلغاء</Button>
                    <Button
                        style={{ width: 92, marginTop: 30, backgroundColor: "#098D9C", color: "#fff" }}
                        type='submit'>حفظ</Button>
                </Form>
            </div>
        </div>
    )
}

export default PromotionRequestEditForm;


// import React, { useState } from 'react';
// import useForm from '../../Hooks/useForm';
// import axios from 'axios';
// import { Button, Form } from 'semantic-ui-react';
// import FileUpload from './fileUpload';

// function PromotionRequestEditForm({ promotionRequestData, handleUpdatePromotionRequest, handleToggleEditForm, handleAlert, user }) {

//     const [promotionRequest, setPromotionRequest] = useState(promotionRequestData);

//     const initailValues = {
//         example_info_1: promotionRequest.example_info_1,
//         example_info_2: promotionRequest.example_info_2,
//     }

//     const [values, setValues] = useForm(initailValues);
//     const [files, setFiles] = useState(promotionRequestData.files);

//     const fileUpload = (file) => {
//         const newFile = {
//             url: file.url,
//             name: file.filename,
//             uploadId: file.uploadId,
//             uploaded_by_administrativeRank: user.administrativeRank
//         }
//         setFiles([...files, newFile])
//     }

//     const handleRemoveFile = (uploadId) => {
//         const updatedFiles = files.filter(file => file.uploadId !== uploadId)
//         setFiles(updatedFiles)
//     }

//     const handleSubmit = () => {

//         let alert;

//         const updatedPromotionRequest = {
//             example_info_1: values.example_info_1,
//             example_info_2: values.example_info_2,
//             files: files
//         }
//         axios.put(`/promotionRequests/${promotionRequest._id}`, updatedPromotionRequest)
//             // axios.put(`http://localhost:5000/promotionRequests/${promotionRequest._id}`, updatedPromotionRequest)
//             .then(res => {
//                 if (res.data.success) {
//                     handleUpdatePromotionRequest(promotionRequest._id,
//                         {
//                             ...promotionRequest,
//                             ...updatedPromotionRequest,
//                             current_phase_number: 1
//                         })
//                     setPromotionRequest({ ...promotionRequest, ...updatedPromotionRequest });
//                     alert = {
//                         message: res.data.message,
//                         type: "success"
//                     };
//                 } else {
//                     alert = {
//                         message: res.data.message,
//                         type: "fail"
//                     };
//                 }
//                 handleAlert(alert)
//             });
//     }

//     return (
//         <div className="promotion-request-form">
//             <Form onSubmit={handleSubmit}>
//                 <Form.Field>
//                     <label>Example Info 1</label>
//                     <input placeholder='Example Info 1' name="example_info_1" value={values.example_info_1} onChange={setValues} />
//                 </Form.Field>
//                 <Form.Field>
//                     <label>Example Info 2</label>
//                     <input placeholder='Example Info 2' name="example_info_2" value={values.example_info_2} onChange={setValues} />
//                 </Form.Field>
//                 <div className="files-list">
//                     {
//                         files.map(file => (
//                             <p className="file" key={file.uploadId}>
//                                 <span>{file.name}</span>
//                                 {
//                                     file.uploaded_by_administrativeRank === user.administrativeRank && <span
//                                         style={{ cursor: 'pointer' }}
//                                         onClick={() => handleRemoveFile(file.uploadId)}>
//                                         <i class="fas fa-trash-alt"></i>
//                                     </span>
//                                 }
//                             </p>
//                         ))
//                     }
//                 </div>
//                 <FileUpload fileUpload={fileUpload} />
//                 <Button
//                     onClick={() => handleToggleEditForm()}
//                     style={{ width: 92, marginTop: 30, marginRight: 20 }}
//                     type='button'>إلغاء</Button>
//                 <Button
//                     style={{ width: 92, marginTop: 30, backgroundColor: "#098D9C", color: "#fff" }}
//                     type='submit'>حفظ</Button>
//             </Form>
//         </div>
//     )
// }

// export default PromotionRequestEditForm;