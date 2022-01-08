import React, { useContext, useState } from 'react';
import '../Style/login.css';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from './userContext';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../wise-logo/wise-logo.png'

function AdminRegister() {

    const [values, setValues] = useForm({});
    const context = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async () => {
        const newUser = {
            full_name: values.full_name,
            teacher_id: values.teacher_id,
            password: values.password,
            administrativeRank: 0,
            isAdmin: true
        }

        setIsLoading(true)

        await axios.post("/register", newUser)
            // await axios.post("http://localhost:5000/register", newUser)
            .then(res => {
                if (res.data.auth) {
                    context.login(res.data.result);
                } else {
                    setAlert(res.data.message);
                    document.getElementById("alert").scrollIntoView({ behavior: 'smooth', block: "end" });
                }
            });

        setIsLoading(false)
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
            <Form loading={isLoading} onSubmit={handleRegister}>
                <Form.Field>
                    <label>الإسم الكامل</label>
                    <input placeholder='الإسم الكامل' required name="full_name" value={values.full_name} onChange={setValues} />
                </Form.Field>
                <Form.Field>
                    <label>الرقم الوظيفي</label>
                    <input placeholder='الرقم الوظيفي' required name="teacher_id" value={values.teacher_id} onChange={setValues} />
                </Form.Field>
                <Form.Field>
                    <label>كلمة السر</label>
                    <input type="password" placeholder='كلمة السر' required name="password" value={values.password} onChange={setValues} />
                </Form.Field>
                <div className="login-buttons">
                    <Link to="/login">لديك حساب بالفعل ؟</Link>
                    <Button style={{ fontFamily: "inherit" }} type='submit'>إنشاء حساب</Button>
                </div>
            </Form>
        </div>
    )
}

export default AdminRegister;