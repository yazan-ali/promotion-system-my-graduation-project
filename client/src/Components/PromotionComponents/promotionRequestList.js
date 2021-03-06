import React, { useState, useEffect } from 'react';
import PromotionRequest from './promotionRequest';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";
import Loader from '../loader';
import Snackbar from '../snackbar';

function PromotionRequestList({ user }) {

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);

    const promotionRequest = useSelector((state) => state.promotionRequest);
    const dispatch = useDispatch();

    useEffect(async () => {

        setIsLoading(true)

        if (user) {

            // await axios.get(`/promotionRequests/${user.id}`).
            await axios.get(`http://localhost:5000/promotionRequests/${user.id}`).
                then(res => {
                    if (res.data.success) {
                        dispatch(setPromotionRequest(res.data.result));
                    }
                })
        }

        setIsLoading(false)

    }, []);


    const handleAlert = (alert) => {
        setAlert(alert)
        setShowSnackbar(true);
    }

    const closeSnackbar = () => {
        setShowSnackbar(false);
    }

    if (isLoading) return (
        <Loader color={"#fff"} size={"huge"} inverted={true} />
    )

    return (
        <div className="promotion-request-root">
            {
                promotionRequest ? (
                    <PromotionRequest
                        key={promotionRequest._id}
                        promotionRequest={promotionRequest}
                        user={user}
                        handleAlert={handleAlert}
                    />
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <a
                            className="link-buttons"
                            style={{ padding: "0.8rem 1.5rem" }}
                            download
                            href="https://cdn.filestackcontent.com/DBbljZ4MSCWa8H8g4OI3">
                            <i style={{ marginRight: 10 }} className="fas fa-book"></i> ???????????? ???????????? ??????????????</a>
                        <Link
                            className="link-buttons"
                            to="/promotion-request/create/?????????? ?????????? ??????????">
                            ?????????? ?????? ?????????? ?????????? ??????????
                        </Link>

                        <Link
                            className="link-buttons"
                            to="/promotion-request/create/?????????? ?????????? ??????????">
                            ?????????? ?????? ?????????? ?????????? ??????????
                        </Link>

                        <Link
                            className="link-buttons"
                            to="/promotion-request/create/?????????? ?????????? ??????????">
                            ?????????? ?????? ?????????? ?????????? ??????????
                        </Link>

                    </div>
                )
            }
            {
                showSnackbar && (
                    <Snackbar
                        message={alert.message}
                        type={alert.type}
                        direction={"bottom"}
                        duration={5000}
                        closeSnackbar={closeSnackbar}
                    />
                )
            }
        </div >
    )
}

export default PromotionRequestList;