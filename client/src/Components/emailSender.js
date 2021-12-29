import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Select, TextArea } from 'semantic-ui-react';

function EmailSender({ emailAttachment }) {

    const [from, setFrom] = useState("");
    const [emails, setEmails] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [numOfEmails, setNumOfEmails] = useState(1);

    const increaseInputFields = () => {
        setNumOfEmails(prev => prev + 1);
    }

    const decreaseInputFields = () => {
        setNumOfEmails(prev => prev - 1);
    }

    const handleFromChange = (evt) => {
        setFrom(evt.target.value);
    }

    const addNewEmail = (evt) => {
        // setEmails([...emails, { [evt.target.name]: evt.target.value }])
        setEmails(evt.target.value);
    }

    const handleSubjectChange = (evt) => {
        setSubject(evt.target.value);
    }

    const handleBodyChange = (evt) => {
        setBody(evt.target.value);
    }


    const handelSendEmail = async (evt) => {
        evt.preventDefault();

        const email = {
            from,
            to: emails,
            subject,
            body,
            attachments: emailAttachment
        }

        await axios.post("http://localhost:5000/send-email", email)
            .then(res => {
                // if (res.data.success) {
                //     alert = {
                //         message: res.data.message,
                //         type: "success"
                //     };
                //     dispatch(setPromotionRequest(res.data.result));
                // } else {
                //     if (Object.keys(res.data.errors).length > 0) {
                //         setErrors(res.data.errors)
                //         return
                //     }
                //     alert = {
                //         message: res.data.message,
                //         type: "fail"
                //     }
                // }
                // handleAlert(alert)
            });

        // setIsLoading(false)
    }

    return (
        <div>
            <Form onSubmit={handelSendEmail}>
                <Form.Field>
                    <label>من</label>
                    <input
                        placeholder='البريد الإلكتروني الخاص بك'
                        value={from}
                        onChange={handleFromChange}
                        required
                    />
                </Form.Field>
                <label>إلى</label>
                <Form>
                    {
                        Array.from({ length: numOfEmails }).map((_, idx) => (
                            <Form.Field>
                                {/* <input type="email"
                                    placeholder='البريد الإلكتروني المرسل له'
                                    value={emails[`email_${idx}`]}
                                    name={`email_${idx + 1}`}
                                    onChange={addNewEmail}
                                    required
                                /> */}
                                <input type="email"
                                    placeholder='البريد الإلكتروني المرسل له'
                                    value={emails}
                                    onChange={addNewEmail}
                                    required
                                />
                            </Form.Field>
                        ))
                    }
                    <Form.Field>
                        <label>الموضوع</label>
                        <input
                            placeholder='الموضوع'
                            value={subject}
                            onChange={handleSubjectChange}
                            required
                        />
                    </Form.Field>
                    <TextArea
                        placeholder='الرسالة'
                        value={body}
                        onChange={handleBodyChange}
                        required
                    />
                </Form>
                <button onClick={increaseInputFields} type="button">+</button>
                <button onClick={decreaseInputFields} type="button">-</button>
                {/* <input type="file" /> */}
                <button type="submit">Send</button>
            </Form>
        </div>
    )
}

export default EmailSender;