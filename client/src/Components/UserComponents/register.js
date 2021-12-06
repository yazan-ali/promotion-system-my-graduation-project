import React, { useContext, useState } from 'react';
import '../Style/login.css';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from './userContext';
import { Select } from 'semantic-ui-react';
import { rankOptions, collegeOptions, sectionOptions } from '../../constants';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../wise-logo/wise-logo.png'

function Register() {

    const [values, setValues] = useForm({});
    const [rank, setRank] = useState("");
    const [college, setCollege] = useState("");
    const [section, setSection] = useState("");
    const [sections, setSections] = useState([]);
    const [date, setDate] = useState(null);
    const [err, setErr] = useState("");
    const context = useContext(AuthContext);
    const [alert, setAlert] = useState(null);


    const handleSelectRank = (evt, data) => {
        setRank(data.value)
    }

    const handleSelectCollege = (evt, data) => {
        setCollege(data.value)
        setErr("")
        data.options.map(option => {
            if (option.value === data.value) {
                setSections(option.key)
            }
        })
    }

    const handleSelectSection = (evt, data) => {
        setSection(data.value)

    }

    const handleErr = () => {
        if (college.length > 0) {
            setErr("")
        } else {
            setErr("اختر الكلية أولا")
        }
    }

    const onDateChange = (event, data) => {
        setDate(data.value)
    }

    const handleRegister = () => {
        const newUser = {
            full_name: values.full_name,
            teacher_id: values.teacher_id,
            password: values.password,
            rank: rank,
            college: college,
            section: section,
            year: date,
            administrativeRank: 0
        }
        axios.post("/register", newUser)
            // axios.post("http://localhost:5000/register", newUser)
            .then(res => {
                if (res.data.auth) {
                    context.login(res.data.result);
                } else {
                    setAlert(res.data.message);
                    document.getElementById("alert").scrollIntoView({ behavior: 'smooth', block: "end" });
                }
            });
    }

    return (
        <div className="login-form-root">
            <div className="wise-logo">
                <img src={logo} alt="wise-logo" />
            </div>
            <h2>إنشاء حساب جديد</h2>
            <div style={{ padding: "20px 0" }} id="alert">
                {
                    alert && (
                        <Message
                            error
                            content={alert}
                        />
                    )
                }
            </div>
            <Form onSubmit={handleRegister}>
                <Form.Field>
                    <label>الإسم الكامل</label>
                    <input placeholder='الإسم الكامل' name="full_name" value={values.full_name} onChange={setValues} />
                </Form.Field>
                <Form.Field>
                    <label>الرقم الوظيفي</label>
                    <input placeholder='الرقم الوظيفي' name="teacher_id" value={values.teacher_id} onChange={setValues} />
                </Form.Field>
                <Form.Field>
                    <label>الرتبة</label>
                    <Select
                        className="login-select"
                        placeholder='اختر الرتبة'
                        options={rankOptions}
                        onChange={handleSelectRank}
                    />
                </Form.Field>
                <Form.Field>
                    <label>الكلية</label>
                    <Select
                        className="login-select"
                        placeholder='اختر الكلية'
                        options={collegeOptions}
                        onChange={handleSelectCollege}
                    />
                </Form.Field>
                <Form.Field>
                    <label>القسم</label>
                    <Select
                        className="login-select"
                        error={err.length > 0}
                        placeholder='اختر القسم'
                        options={sectionOptions[sections]}
                        onChange={handleSelectSection}
                        onClick={handleErr}
                    />
                    <p className="error">{err}</p>
                </Form.Field>
                <Form.Field>
                    <label>سنة التعين</label>
                    <SemanticDatepicker pointing="top right" onChange={onDateChange} />
                </Form.Field>
                <Form.Field>
                    <label>كلمة السر</label>
                    <input type="password" placeholder='كلمة السر' name="password" value={values.password} onChange={setValues} />
                </Form.Field>
                <div className="login-buttons">
                    <Link to="/login">لديك حساب بالفعل ؟</Link>
                    <Button style={{ fontFamily: "inherit" }} type='submit'>إنشاء حساب</Button>
                </div>
            </Form>
        </div>
    )
}

export default Register;