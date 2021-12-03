import React, { useContext } from 'react';
import './Style/navbar.css';
import { AuthContext } from './UserComponents/userContext';
import LogoutButton from './UserComponents/logoutButton';
import { Link } from 'react-router-dom';
import logo from './wise-logo/wise-logo.png'

function Navbar() {

    const { user } = useContext(AuthContext);

    return (
        <>
            <nav className="navbar">
                <label className="system-name">WISE Promotion System</label>
                {user && <img src={logo} alt="wise-logo" />}
                <ul>
                    {
                        user ? (
                            <LogoutButton />
                        ) : (
                            <>
                                <li><Link to="/login">تسجيل الدخول</Link></li>
                                <li><Link to="/register">إنشاء حساب</Link></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </>
    );
}

export default Navbar;