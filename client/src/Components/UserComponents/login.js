import React, { useContext, useState } from 'react';
import useForm from '../../Hooks/useForm';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { AuthContext } from './userContext';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../wise-logo/wise-logo.png';


function Login() {

    const [values, setValues] = useForm({});
    const context = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {

        const loginInfo = {
            username: values.username,
            password: values.password,
        }

        setIsLoading(true)

        // await axios.post("/login", loginInfo)
        await axios.post("http://localhost:5000/login", loginInfo)
            .then(res => {
                if (res.data.auth) {
                    context.login(res.data.result);
                }
                else {
                    setAlert(res.data.message);
                }
            });

        setIsLoading(false)
    }

    return (
        <div className="login-form-root">
            <div className="wise-logo">
                <img src={logo} alt="wise-logo" />
            </div>
            <h2>تسجيل الدخول</h2>
            {
                alert && (
                    <Message
                        error
                        content={alert}
                    />
                )
            }
            <Form loading={isLoading} onSubmit={handleLogin}>
                <Form.Field>
                    <label>اسم المستخدم</label>
                    <input required placeholder='اسم المستخدم' name="username" value={values.username} onChange={setValues} />
                </Form.Field>
                <Form.Field>
                    <label>كلمة السر</label>
                    <input type="password" required placeholder='كلمة السر' name="password" value={values.password} onChange={setValues} />
                </Form.Field>
                <div className="login-buttons" >
                    <Link to="/register">إنشاء حساب جديد</Link>
                    <Button style={{ fontFamily: "inherit" }} type='submit'>دخول</Button>
                </div>
            </Form>
        </div>
    )
}

export default Login;