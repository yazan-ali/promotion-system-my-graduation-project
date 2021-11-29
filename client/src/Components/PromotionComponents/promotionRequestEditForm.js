import React, { useState, useEffect } from 'react';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form, Label } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import Accordion from './accordion';

function PromotionRequestEditForm({ promotionRequestData, handleUpdatePromotionRequest, handleToggleEditForm, handleAlert, user }) {

    const [promotionRequest, setPromotionRequest] = useState(promotionRequestData);
    const [errors, setErrors] = useState({});

    const initailValues = {
        example_info_1: promotionRequest.example_info_1,
        example_info_2: promotionRequest.example_info_2,
    }

    const [values, setValues] = useForm(initailValues);
    const [files, setFiles] = useState(promotionRequestData.user_files);

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
        const newFile = {
            ...file,
            uploaded_by_administrativeRank: user.administrativeRank
        }
        setFiles([...files, newFile])
    }

    const handleRemoveFile = (uploadId) => {
        const updatedFiles = files.filter(file => file.uploadId !== uploadId)
        setFiles(updatedFiles)
    }

    const handleSubmit = () => {

        let alert;

        const updatedPromotionRequest = {
            example_info_1: values.example_info_1,
            example_info_2: values.example_info_2,
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
                            current_phase_number: 1
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
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Example Info 1</label>
                    <input placeholder='Example Info 1' name="example_info_1" value={values.example_info_1} onChange={setValues} />
                </Form.Field>
                <FileUpload
                    label="البحث الأول"
                    fileUpload={fileUpload}
                    removeFile={handleRemoveFile}
                    fileData={files[0]}
                />
                <FileUpload
                    label="البحث الثاني"
                    fileUpload={fileUpload}
                    removeFile={handleRemoveFile}
                    fileData={files[1]}
                />
                {errors.files && <div style={{ paddingTop: 10 }}>
                    <Label basic color='red' pointing="right">
                        {errors.files}
                    </Label>
                </div>}
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