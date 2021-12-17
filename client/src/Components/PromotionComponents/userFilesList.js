import React from 'react';

function UserFilesList({ user_files }) {
    return (
        <div className="files-list">
            {
                user_files?.file_1 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{user_files.file_1.label}</label>
                        <p className="file">{user_files.file_1.name}</p>
                    </div>
                )
            }
            {
                user_files?.file_2 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{user_files.file_2.label}</label>
                        <p className="file">{user_files.file_2.name}</p>
                    </div>
                )
            }
            {
                user_files?.file_3 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{user_files.file_3.label}</label>
                        <p className="file">{user_files.file_3.name}</p>
                    </div>
                )
            }
            {
                user_files?.file_4 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{user_files.file_4.label}</label>
                        <p className="file">{user_files.file_4.name}</p>
                    </div>
                )
            }
            {
                user_files?.file_5 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{user_files.file_5.label}</label>
                        <p className="file">{user_files.file_5.name}</p>
                    </div>
                )
            }
            {
                user_files?.file_6 && (
                    <div>
                        <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>{user_files.file_6.label}</label>
                        <p className="file">{user_files.file_6.name}</p>
                    </div>
                )
            }
            {
                user_files?.researchFiles &&
                <div>
                    <label style={{ display: "block", marginRight: 5, padding: "15px 0" }}>الأبحاث</label>
                    {
                        user_files.researchFiles.map(file => (
                            <p className="file" key={file.file.uploadId}>{file.file.name}</p>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default UserFilesList;