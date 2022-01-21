import React, { useContext } from 'react';
import { AuthContext } from './userContext';
import { useDispatch } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";

function LogoutButton() {

    const dispatch = useDispatch();

    const { logout } = useContext(AuthContext);

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