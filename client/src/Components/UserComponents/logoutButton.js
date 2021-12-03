import React, { useContext } from 'react';
import { AuthContext } from './userContext';
import { Button } from 'semantic-ui-react';

function LogoutButton() {

    const { user, logout } = useContext(AuthContext);


    return (
        <div>
            <li onClick={logout}><span>تسجيل الخروج</span></li>
        </div>
    )
}

export default LogoutButton;