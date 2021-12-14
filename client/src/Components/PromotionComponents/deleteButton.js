import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";

function DeleteButton({ id, handleAlert }) {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""
    }, [])

    const handleDelete = () => {
        let alert;
        // axios.delete(`/promotionRequests/${id}`)
        axios.delete(`http://localhost:5000/promotionRequests/${id}`)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionRequest(null));
                    alert = {
                        message: res.data.message,
                        type: "success"
                    };
                } else {
                    alert = {
                        message: res.data.message,
                        type: "fail"
                    };
                }
                handleAlert(alert)
            })
    }

    return (
        <Button style={{ backgroundColor: "#D1162C", color: "#fff" }} onClick={handleDelete}>
            Delete
        </Button>
    )
}

export default DeleteButton;