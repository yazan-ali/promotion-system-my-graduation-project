import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, TextArea } from 'semantic-ui-react';
import FileUpload from '../Components/PromotionComponents/fileUpload'

function EmailSender({ emailAttachment, uploadedFiles, unselectFile, fileUpload, promotionRequestID }) {

    const [emails, setEmails] = useState({});
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [numOfEmails, setNumOfEmails] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const increaseInputFields = () => {
        setNumOfEmails(prev => prev + 1);
    }

    const addNewEmail = (evt) => {
        setEmails({ ...emails, [evt.target.name]: evt.target.value })
    }

    const handleSubjectChange = (evt) => {
        setSubject(evt.target.value);
    }

    const handleBodyChange = (evt) => {
        setBody(evt.target.value);
    }


    const handelSendEmail = async (evt) => {
        evt.preventDefault();

        setIsLoading(true);

        const email = {
            mailList: emails,
            subject,
            body,
            attachments: [...emailAttachment, ...uploadedFiles]
        }

        // await axios.post(`/send-email/${promotionRequestID}`, email)
        await axios.post(`http://localhost:5000/send-email/${promotionRequestID}`, email)

        setIsLoading(false)
    }

    return (
        <div className="email-form">
            <h3>إرسال بريد إلكتروني</h3>
            <Form onSubmit={handelSendEmail}>
                <label>إلى</label>
                <div style={{ marginTop: 5 }}>
                    {
                        Array.from({ length: numOfEmails }).map((_, idx) => (
                            <Form.Field>
                                <input
                                    type="email"
                                    value={emails[`email_${idx + 1}`]}
                                    name={`email_${idx + 1}`}
                                    onChange={addNewEmail}
                                    required={idx === 0 ? true : false}
                                />
                            </Form.Field>
                        ))
                    }
                </div>
                <Button
                    onClick={increaseInputFields}
                    type="button"
                    style={{ margin: "10px 0" }}
                >+</Button>
                <Form.Field>
                    <label>الموضوع</label>
                    <input
                        value={subject}
                        onChange={handleSubjectChange}
                        required
                    />
                </Form.Field>
                <TextArea
                    placeholder='الرسالة'
                    value={body}
                    onChange={handleBodyChange}
                />

                {emailAttachment.length > 0 && <div style={{ padding: "30px 0" }}>
                    <p>الملفات المرفقة</p>
                    {
                        emailAttachment.map(file => (
                            <p style={{ cursor: "default" }} className="file" key={file.path}>
                                {file.filename}
                            </p>
                        ))
                    }
                    {
                        uploadedFiles.map(file => (
                            <p style={{ cursor: "default" }} className="file" key={file.path}>
                                <span>{file.filename}</span>
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => unselectFile(file.path)}>
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                            </p>
                        ))
                    }
                </div>}

                <FileUpload
                    fileUpload={fileUpload}
                    doNotShowFile={true}
                />

                <Button
                    loading={isLoading}
                    disabled={isLoading}
                    type="submit"
                    style={{ backgroundColor: "#098D9C", color: "#fff", marginTop: 20 }}
                >
                    إرسال
                </Button>
            </Form>
        </div>
    )
}

export default EmailSender;