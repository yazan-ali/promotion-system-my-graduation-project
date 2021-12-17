// import React, { useState } from 'react';
// import FileUpload from './fileUpload';
// import { useDispatch, useSelector } from "react-redux";
// import { setAdministrativeFile, removeAdministrativeFile, } from "../../state/actions/teacherDataActions";
// import axios from 'axios';

// function Administrativeadministrative_files({ administrative_files, user, promotionRequest }) {

//     const dispatch = useDispatch();

//     const [showSaveBtn, setShowSaveBtn] = useState(false);

//     const fileUpload = (file, n = null) => {
//         dispatch(setAdministrativeFile({
//             file: { ...file, uploaded_by_administrativeRank: user.administrativeRank },
//             file_num: n
//         }));
//         setShowSaveBtn(true);
//     }

//     const handleRemoveFile = (n) => {
//         dispatch(removeAdministrativeFile(n));
//         setShowSaveBtn(true);
//     }

//     const handleSubmit = () => {
//         const administrative_files = {
//             administrative_files: administrative_files
//         }
//         axios.put(`http://localhost:5000/promotionRequests/administrative/${promotionRequest._id}`, administrative_files)
//             // axios.put(`/promotionRequests/administrative/${promotionRequest._id}`, administrative_files)
//             .then(res => {
//                 if (res.data.success) {
//                     setShowSaveBtn(false);
//                 }
//             });
//     }

//     return (
//         <div>
//             <label>ملفات المشرفين</label>

//             {
//                 user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
//                     <FileUpload
//                         label={administrative_files?.file_1 ? administrative_files.file_1.label : "ملف 1"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_1 && administrative_files.file_1}
//                         canEdit={user.administrativeRank === 1 && promotionRequest.current_phase_number === 1}
//                         n={1}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 ) : administrative_files?.file_1 && (
//                     <FileUpload
//                         label={administrative_files?.file_1 ? administrative_files.file_1.label : "ملف 1"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_1 && administrative_files.file_1}
//                         canEdit={false}
//                         n={1}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 )
//             }


//             {
//                 user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
//                     <FileUpload
//                         label={administrative_files?.file_2 ? administrative_files.file_2.label : "ملف 2"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_2 && administrative_files.file_2}
//                         canEdit={user.administrativeRank === 1 && promotionRequest.current_phase_number === 1}
//                         n={2}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 ) : administrative_files?.file_2 && (
//                     <FileUpload
//                         label={administrative_files?.file_2 ? administrative_files.file_2.label : "ملف 2"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_2 && administrative_files.file_2}
//                         canEdit={false}
//                         n={2}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 )
//             }

//             {
//                 user.administrativeRank === 1 && promotionRequest.current_phase_number === 1 ? (
//                     <FileUpload
//                         label={administrative_files?.file_3 ? administrative_files.file_3.label : "ملف 3"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_3 && administrative_files.file_3}
//                         canEdit={user.administrativeRank === 1 && promotionRequest.current_phase_number === 1}
//                         n={3}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 ) : administrative_files?.file_3 && (
//                     <FileUpload
//                         label={administrative_files?.file_3 ? administrative_files.file_3.label : "ملف 3"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_3 && administrative_files.file_3}
//                         canEdit={false}
//                         n={3}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 )
//             }

//             {
//                 user.administrativeRank === 2 && promotionRequest.current_phase_number === 2 ? (
//                     <FileUpload
//                         label={administrative_files?.file_4 ? administrative_files.file_4.label : "ملف 4"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_4 && administrative_files.file_4}
//                         canEdit={user.administrativeRank === 2 && promotionRequest.current_phase_number === 2}
//                         n={4}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 ) : administrative_files?.file_4 && (
//                     <FileUpload
//                         label={administrative_files?.file_4 ? administrative_files?.file_4.label : "ملف 4"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_4 && administrative_files.file_4}
//                         canEdit={false}
//                         n={4}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 )
//             }

//             {
//                 user.administrativeRank === 2 && promotionRequest.current_phase_number === 2 ? (
//                     <FileUpload
//                         label={administrative_files?.file_5 ? administrative_files.file_5.label : "ملف 5"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_5 && administrative_files.file_5}
//                         canEdit={user.administrativeRank === 2 && promotionRequest.current_phase_number === 2}
//                         n={5}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 ) : administrative_files?.file_5 && (
//                     <FileUpload
//                         label={administrative_files?.file_5 ? administrative_files?.file_5.label : "ملف 5"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_5 && administrative_files.file_5}
//                         canEdit={false}
//                         n={5}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 )
//             }

//             {
//                 user.administrativeRank === 2 && promotionRequest.current_phase_number === 2 ? (
//                     <FileUpload
//                         label={administrative_files?.file_6 ? administrative_files.file_6.label : "ملف 6"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_6 && administrative_files.file_6}
//                         canEdit={user.administrativeRank === 2 && promotionRequest.current_phase_number === 2}
//                         n={6}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 ) : administrative_files?.file_6 && (
//                     <FileUpload
//                         label={administrative_files?.file_6 ? administrative_files?.file_6.label : "ملف 6"}
//                         fileUpload={fileUpload}
//                         removeFile={handleRemoveFile}
//                         fileData={administrative_files?.file_6 && administrative_files.file_6}
//                         canEdit={false}
//                         n={6}
//                         administrativeFile={true}
//                         user={user}
//                     />
//                 )
//             }
//             {
//                 showSaveBtn &&
//                 <Button
//                     type="button"
//                     style={{ backgroundColor: "#098D9C", color: "#fff", marginTop: 20 }}
//                     onClick={handleSubmit}>
//                     حفظ
//                 </Button>
//             }
//         </div>
//     )
// }

// export default Administrativeadministrative_files;


import React from 'react'

export default function AdministrativeFilesList({ administrative_files }) {
    return (
        <div className="files-list">
            <label>ملفات المشرفين</label>
            {
                administrative_files?.file_1 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{administrative_files.file_1.label}</label>
                        <p className="file">{administrative_files.file_1.name}</p>
                    </div>
                )
            }
            {
                administrative_files?.file_2 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{administrative_files.file_2.label}</label>
                        <p className="file">{administrative_files.file_2.name}</p>
                    </div>
                )
            }
            {
                administrative_files?.file_3 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{administrative_files.file_3.label}</label>
                        <p className="file">{administrative_files.file_3.name}</p>
                    </div>
                )
            }
            {
                administrative_files?.file_4 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{administrative_files.file_4.label}</label>
                        <p className="file">{administrative_files.file_4.name}</p>
                    </div>
                )
            }
            {
                administrative_files?.file_5 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{administrative_files.file_5.label}</label>
                        <p className="file">{administrative_files.file_5.name}</p>
                    </div>
                )
            }
            {
                administrative_files?.file_6 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{administrative_files.file_6.label}</label>
                        <p className="file">{administrative_files.file_6.name}</p>
                    </div>
                )
            }
            {
                administrative_files?.researchFiles &&
                <div>
                    <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>الأبحاث</label>
                    {
                        administrative_files.researchFiles.map(file => (
                            <p className="file" key={file.file.uploadId}>{file.file.name}</p>
                        ))
                    }
                </div>
            }
        </div>
    )
}
