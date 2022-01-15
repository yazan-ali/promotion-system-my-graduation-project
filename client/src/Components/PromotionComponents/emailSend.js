import React, { useState, useEffect } from 'react';
import EmailSender from '../emailSender'
import UserFilesList from './userFilesList'
import "../Style/emailSender.css"

function EmailSend({ user_files, promotionRequestID }) {

    const [selectedFiles, setSelectedFiles] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([])

    useEffect(() => {

        document.getElementById("email-form").scrollIntoView({ behavior: 'smooth', block: "start" });

        let files = []

        for (let file in user_files) {
            if (file === "researchFiles" && user_files[file]) {
                user_files[file].map(file => {
                    files.push({
                        filename: file.file.name,
                        path: file.file.url
                    })
                })
            } else if (user_files[file]) {
                console.log(user_files[file])

                files.push({
                    filename: user_files[file].name,
                    path: user_files[file].url
                })
            }
        }


        setSelectedFiles(files)

    }, [])

    const fileUpload = (file) => {
        const uploadedFile = {
            filename: file.name,
            path: file.url
        }
        setUploadedFiles([...uploadedFiles, uploadedFile])
    }

    const unselectFile = (path) => {
        const filteredFiles = uploadedFiles.filter(file => file.path !== path)
        setUploadedFiles(filteredFiles)
    }

    return (
        <div className="email-sender" id="email-form">
            <h2>إرسال طلب الترقية إلى المحكمين</h2>
            <div className="files">

            </div>
            <EmailSender
                emailAttachment={selectedFiles}
                uploadedFiles={uploadedFiles}
                promotionRequestID={promotionRequestID}
                unselectFile={unselectFile}
                fileUpload={fileUpload}
            />
        </div>
    )
}

export default EmailSend;