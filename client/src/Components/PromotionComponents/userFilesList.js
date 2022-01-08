import React from 'react';

function UserFilesList({ user_files }) {

    return (
        <div className="files-list">
            {
                user_files?.file_1 && (
                    <div>
                        <label className="file-label">{user_files.file_1.label}</label>
                        <p className="file">
                            <a
                                href={user_files.file_1.url}>
                                {user_files.file_1.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_2 && (
                    <div>
                        <label className="file-label">{user_files.file_2.label}</label>
                        <p className="file">
                            <a
                                href={user_files.file_2.url}>
                                {user_files.file_2.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_3 && (
                    <div>
                        <label className="file-label">{user_files.file_3.label}</label>
                        <p className="file">
                            <a
                                href={user_files.file_3.url}>
                                {user_files.file_3.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_4 && (
                    <div>
                        <label className="file-label">{user_files.file_4.label}</label>
                        <p className="file">
                            <a
                                href={user_files.file_4.url}>
                                {user_files.file_4.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_5 && (
                    <div>
                        <label className="file-label">{user_files.file_5.label}</label>
                        <p className="file">
                            <a
                                href={user_files.file_5.url}>
                                {user_files.file_5.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_6 && (
                    <div>
                        <label className="file-label">{user_files.file_6.label}</label>
                        <p className="file">
                            <a
                                href={user_files.file_6.url}>
                                {user_files.file_6.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_7 && (
                    <div>
                        <label className="file-label">السنة الإدارية الأولى</label>
                        <p className="file">
                            <a
                                href={user_files.file_7.url}>
                                {user_files.file_7.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.file_8 && (
                    <div>
                        <label className="file-label">السنة الإدارية الثانية</label>
                        <p className="file">
                            <a
                                href={user_files.file_8.url}>
                                {user_files.file_8.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                user_files?.researchFiles &&
                <div>
                    <label className="file-label">الأبحاث</label>
                    {
                        user_files.researchFiles.map(file => (
                            file && (
                                <p
                                    className="file" key={file.file.uploadId}>
                                    <a href={file.file.url}>
                                        {file.file.name}
                                    </a>
                                </p>
                            )
                        ))
                    }
                </div>
            }
        </div >
    )
}

export default UserFilesList;