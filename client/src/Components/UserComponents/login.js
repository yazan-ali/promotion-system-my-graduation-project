import React, { useContext, useState } from 'react';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from './userContext';
import { Message } from 'semantic-ui-react'

function Login() {

    const [values, setValues] = useForm({});
    const context = useContext(AuthContext);
    const [alert, setAlert] = useState(null);

    const handleLogin = () => {

        const loginInfo = {
            username: values.username,
            password: values.password,
        }
        axios.post("/login", loginInfo)
            // axios.post("http://localhost:5000/login", loginInfo)
            .then(res => {
                if (res.data.auth) {
                    context.login(res.data.result);
                }
                else {
                    setAlert(res.data.message);
                }
            });
    }

    return (
        <div className="login-form-root">
            <h2>تسجيل الدخول</h2>
            {
                alert && (
                    <Message
                        error
                        content={alert}
                    />
                )
            }
            <Form onSubmit={handleLogin}>
                <Form.Field>
                    <label>اسم المستخدم</label>
                    <input placeholder='اسم المستخدم' name="username" value={values.username} onChange={setValues} />
                </Form.Field>
                <Form.Field>
                    <label>كلمة السر</label>
                    <input type="password" placeholder='كلمة السر' name="password" value={values.password} onChange={setValues} />
                </Form.Field>
                <Button type='submit'>دخول</Button>
            </Form>
        </div>
    )
}

export default Login;