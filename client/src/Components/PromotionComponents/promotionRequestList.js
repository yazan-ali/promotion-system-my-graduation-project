import React, { useState, useEffect } from 'react';
import PromotionRequest from './promotionRequest';
import PromotionRequestCreateForm from './promotionRequestCreateForm';
import PromotionRequestEditForm from './promotionRequestEditForm';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react'
import Snackbar from '../snackbar';
import { useDispatch, useSelector } from "react-redux";
import { setPromotionRequest } from "../../state/actions/promotionRequestActions";
import Loader from '../loader';

function PromotionRequestList({ user }) {

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [erorr, setErorr] = useState(null);
    const [alert, setAlert] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [promotionType, setPromotionType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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


    const handleShowCreateForm = (promotionType) => {
        setShowCreateForm(prevState => !prevState);
        setPromotionType(promotionType)
    }

    const closeSnackbar = () => {
        setShowSnackbar(false);
    }

    const handleAlert = (alert) => {
        setAlert(alert)
        setShowSnackbar(true);
    }

    if (isLoading) return (
        <Loader color={"#fff"} size={4} />
    )

    return (
        <div className="promotion-request-root">
            {
                promotionRequest ? (
                    <PromotionRequest
                        key={promotionRequest._id}
                        promotionRequest={promotionRequest}
                        handleAlert={handleAlert}
                        user={user}
                    />
                ) :

                    showCreateForm ? (
                        <PromotionRequestCreateForm
                            user={user}
                            handleShowCreateForm={handleShowCreateForm}
                            handleAlert={handleAlert}
                            promotionType={promotionType}
                        />
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <Button style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}>
                                    <a
                                        style={{ color: "#1FBDC7" }}
                                        download
                                        href="https://cdn.filestackcontent.com/DBbljZ4MSCWa8H8g4OI3">
                                        <i style={{ marginRight: 10 }} className="fas fa-book"></i> الشروط العامة للترقية</a>
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}
                                    primary
                                    onClick={() => handleShowCreateForm("تثبيت أستاذ مساعد")}>
                                    إنشاء طلب تثبيت أستاذ مساعد
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}
                                    primary
                                    onClick={() => handleShowCreateForm("ترقية أستاذ مشارك")}>
                                    إنشاء طلب ترقية أستاذ مشارك
                                </Button>
                            </div>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#fff", color: "#1FBDC7", width: 180 }}
                                    primary
                                    onClick={() => handleShowCreateForm("ترقية أستاذ جامعي")}>
                                    إنشاء طلب ترقية أستاذ جامعي
                                </Button>
                            </div>
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