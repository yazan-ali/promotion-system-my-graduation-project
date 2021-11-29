import React, { useContext } from 'react';
import { AuthContext } from './userContext';
import { Button } from 'semantic-ui-react';

function LogoutButton() {

    const { user, logout } = useContext(AuthContext);


    return (
        <div>
            <Button style={{ backgroundColor: "#fff", color: "#1FBDC7" }} onClick={logout} type='button'>Logout</Button>
        </div>
    )
}

export default LogoutButton;