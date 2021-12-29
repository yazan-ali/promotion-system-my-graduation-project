import React, { useState, useEffect } from 'react';
import EmailSender from '../emailSender'
import FileUpload from '../../Components/PromotionComponents/fileUpload'

function EmailSend({ user_files }) {

    const [files, setFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

    useEffect(() => {
        const newFiles = []
        for (const file in user_files) {
            if (file === "researchFiles") {
                user_files[file].map(researchFile => {
                    newFiles.push(researchFile.file)
                })
            } else {
                newFiles.push(user_files[file])
            }
        }
        setFiles(newFiles)
    }, [])


    const selectFile = (file) => {
        const selectedFile = {
            filename: file.name,
            path: file.url
        }
        setSelectedFiles([...selectedFiles, selectedFile])
    }

    return (
        <div style={{ marginTop: 100 }}>
            {
                files.map(file => (
                    <p className="file" key={file.path} onClick={() => selectFile(file)}>{file.name}</p>
                ))
            }
            <FileUpload
                fileUpload={selectFile}
            />
            <EmailSender emailAttachment={selectedFiles} />
        </div>
    )
}

export default EmailSend;