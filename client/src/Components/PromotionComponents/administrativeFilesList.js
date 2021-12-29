import React from 'react'

function AdministrativeFilesList({ administrative_files }) {
    return (
        <div className="files-list">
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

export default AdministrativeFilesList;