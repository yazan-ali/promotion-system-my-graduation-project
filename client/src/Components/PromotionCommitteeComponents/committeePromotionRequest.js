import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../UserComponents/userContext';
import Info from '../UserComponents/info';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PromotionRequest from '../PromotionComponents/promotionRequest';
import PromotionCommitteeMembers from './promotionCommitteeMembers';
import { useDispatch, useSelector } from "react-redux";
import { setCommitteePromotionRequest } from "../../state/actions/promotionCommitteeActions";
import Loader from '../loader';

function CommitteePromotionRequest(props) {

    const { user } = useContext(AuthContext);

    const [showButtons, setShowButtons] = useState(false);

    const promotionRequestID = props.match.params.id

    const promotionRequest = useSelector((state) => state.promotionCommittee.promotionRequest);
    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""

        axios.get(`/promotionCommittee/${promotionRequestID}`).
            // axios.get(`http://localhost:5000/promotionCommittee/${promotionRequestID}`).
            then(res => {
                if (res.data.success) {
                    dispatch(setCommitteePromotionRequest(res.data.result))
                }
            })
    }, [])

    if (!user) {
        return <Redirect to="/login" />
    }

    if (!promotionRequest) {
        return <div className="loader">
            <Loader color={"gray"} size={"huge"} />
        </div>
    } else {

        return (
            <div className="teacher-root">
                <div className="teacher">
                    <Info teacher={promotionRequest.promotion_request.created_by} user={user} cssStyle={false} />
                    <div className="teacher-promotion-card-container">
                        <div style={{ width: "100%" }}>
                            {
                                promotionRequest && (
                                    <PromotionRequest
                                        promotionRequest={promotionRequest.promotion_request}
                                        user={user}
                                        promotionCommitteeID={promotionRequest._id}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div >
                <div className="promotion-committee">
                    <h3>يتم مراجعة الطلب من قبل اعضاء اللجنة</h3>
                    <PromotionCommitteeMembers
                        members={promotionRequest.members}
                        promotionCommitteeID={promotionRequest._id}
                        user={user}
                        showButtons={showButtons}
                        canRemove={false}
                    />
                </div>
            </div>
        )
    }
}

export default CommitteePromotionRequest;