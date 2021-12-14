import React, { useState, useRef } from 'react';
import { PickerOverlay } from 'filestack-react';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setUserFiles, removeUserFile } from "../../state/actions/promotionRequestActions";

function FileUpload({ label, fileUpload, removeFile, fileData, doNotShowFile, n, canEdit }) {

    const dispatch = useDispatch();

    const [showFilePicker, setShowFilePicker] = useState(false);
    const [file, setFile] = useState(fileData);

    const handelShowFilePicker = () => {
        setShowFilePicker(true)
    }

    const handelFileUpolad = (res) => {
        const file = res.filesUploaded[0]
        const newFile = {
            url: file.url,
            name: file.filename,
            uploadId: file.uploadId,
            label: label
        }
        if (!doNotShowFile) {
            setFile(newFile);
        }
        if (fileUpload) {
            fileUpload(newFile, n)
        } else {
            dispatch(setUserFiles({
                file: newFile,
                file_num: n
            }));
        }
    }

    const handleRemoveFile = () => {
        if (removeFile) {
            removeFile(n)
        } else {
            dispatch(removeUserFile(n))
        }
        setFile(null);
    }

    return (
        <div>
            <div className="file-upload-root">
                {
                    showFilePicker && (
                        <PickerOverlay
                            apikey="AYjtgfnMtSSCeojaAOQcnz"
                            onSuccess={(res) => setShowFilePicker(false)}
                            onUploadDone={(res) => handelFileUpolad(res)}
                            pickerOptions={{ fromSources: ["local_file_system", "googledrive"] }}
                        />
                    )
                }
            </div>
            <div>
                {label && <label style={{ display: "block", marginRight: 5, padding: "10px 0" }} htmlFor="file-upload">{label}</label>}
                {
                    file ? (
                        <p className="file" key={file.uploadId}>
                            <span>{file.name}</span>
                            {
                                canEdit && (
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleRemoveFile(file.uploadId)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                )
                            }
                        </p>
                    ) : (
                        <Button style={{ marginRight: -2 }} type='button' onClick={handelShowFilePicker}>إضافة ملف</Button>
                    )
                }
            </div>
        </div >
    )
}


export default FileUpload;

// import React, { useState } from 'react';
// import { PickerOverlay } from 'filestack-react';
// import { Button } from 'semantic-ui-react';

// function FileUpload({ fileUpload, label }) {

//     const [showFilePicker, setShowFilePicker] = useState(false);


//     const handelShowFilePicker = () => {
//         setShowFilePicker(true)
//     }

//     const handelFileUpolad = (res) => {
//         const file = res.filesUploaded[0]
//         const newFile = {
//             url: file.url,
//             name: file.filename,
//             uploadId: file.uploadId,
//             label: label
//         }
//         // setFile(newFile);
//         fileUpload(newFile);
//     }

//     const handelFileSubmit = (evt) => {
//         evt.preventDefault();
//     }

//     return (
//         <div>
//             <div className="file-upload-root">
//                 <form onSubmit={handelFileSubmit}>
//                     {
//                         showFilePicker && (
//                             <PickerOverlay
//                                 apikey="AYjtgfnMtSSCeojaAOQcnz"
//                                 onSuccess={(res) => setShowFilePicker(false)}
//                                 onUploadDone={(res) => handelFileUpolad(res)}
//                                 pickerOptions={{ fromSources: ["local_file_system", "googledrive"] }}
//                             />
//                         )
//                     }
//                 </form>
//             </div>
//             <Button type='button' onClick={handelShowFilePicker}>إضافة ملف</Button>
//         </div >
//     )
// }


// export default FileUpload;