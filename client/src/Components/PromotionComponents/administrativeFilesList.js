import React from 'react'

function AdministrativeFilesList({ administrative_files }) {
    return (
        <div className="files-list">
            {
                administrative_files?.file_1 && (
                    <div>
                        <label className="file-label">{administrative_files.file_1.label}</label>
                        <p className="file">
                            <a href={administrative_files.file_1.url}>
                                {administrative_files.file_1.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                administrative_files?.file_2 && (
                    <div>
                        <label className="file-label">{administrative_files.file_2.label}</label>
                        <p className="file">
                            <a href={administrative_files.file_2.url}>
                                {administrative_files.file_2.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                administrative_files?.file_3 && (
                    <div>
                        <label className="file-label">{administrative_files.file_3.label}</label>
                        <p className="file">
                            <a href={administrative_files.file_3.url}>
                                {administrative_files.file_3.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                administrative_files?.file_4 && (
                    <div>
                        <label className="file-label">{administrative_files.file_4.label}</label>
                        <p className="file">
                            <a href={administrative_files.file_4.url}>
                                {administrative_files.file_4.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                administrative_files?.file_5 && (
                    <div>
                        <label className="file-label">{administrative_files.file_5.label}</label>
                        <p className="file">
                            <a href={administrative_files.file_5.url}>
                                {administrative_files.file_5.name}
                            </a>
                        </p>
                    </div>
                )
            }
            {
                administrative_files?.file_6 && (
                    <div>
                        <label className="file-label">{administrative_files.file_6.label}</label>
                        <p className="file">
                            <a href={administrative_files.file_6.url}>
                                {administrative_files.file_6.name}
                            </a>
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default AdministrativeFilesList;