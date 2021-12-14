import React, { useContext } from 'react';
import { AuthContext } from './userContext';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";

function LogoutButton() {

    const dispatch = useDispatch();

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        dispatch(setPromotionRequest(null))
    }

    return (
        <div>
            <li onClick={handleLogout}><span>تسجيل الخروج</span></li>
        </div>
    )
}

export default LogoutButton;