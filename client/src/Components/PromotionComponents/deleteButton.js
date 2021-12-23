import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";

function DeleteButton({ id, handleAlert }) {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""
    }, [])


    const handleDelete = async () => {
        let alert;

        setIsLoading(true)

        // await axios.delete(`/promotionRequests/${id}`)
        await axios.delete(`http://localhost:5000/promotionRequests/${id}`)
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

        setIsLoading(false)

    }

    return (
        <Button
            loading={isLoading}
            disabled={isLoading}
            style={{ backgroundColor: "#D1162C", color: "#fff" }}
            onClick={handleDelete}>
            Delete
        </Button>
    )
}

export default DeleteButton;