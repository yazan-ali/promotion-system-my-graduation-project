import React, { useState, useEffect, useContext } from 'react';
import TeacherPromotionRequest from '../PromotionComponents/teacherPromotionRequest';
import { Button } from 'semantic-ui-react';
import { AuthContext } from './userContext';
import Info from './info';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PromotionCommittee from '../PromotionCommitteeComponents/promotionCommittee';
import { useDispatch, useSelector } from "react-redux";
import { setTeacherData } from "../../state/actions/teacherDataActions";

function Teacher(props) {

    const { user } = useContext(AuthContext);


    // const [teacher, setTeacher] = useState(null);
    // const [showPromotionRequest, setShowPromotionRequest] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    // const showButtonCondition = teacher.promotionRequest && teacher.promotionRequest.current_phase_number === user.administrativeRank

    const teacherID = props.match.params.id

    const teacher = useSelector((state) => state.teacherData);
    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""

        axios.get(`http://localhost:5000/teacher/${teacherID}`).
            then(res => {
                if (res.data.success) {
                    dispatch(setTeacherData(res.data.result))
                    // setTeacher(res.data.result)
                }
            })
    }, [])

    // const handleTogglePromotionRequest = (id) => {
    //     setShowPromotionRequest(prev => !prev)
    // }

    const handleShowButtons = () => {
        setShowButtons(false)
    }

    const handleUpdatePromotionRequest = (file_id, teacher_id, updatedPromotionRequest) => {
        handleUpdatePromotionRequest(file_id, teacher_id, updatedPromotionRequest)
    }

    if (!user) {
        return <Redirect to="/login" />
    }

    if (!teacher) {
        return <h1>Loading...</h1>
    } else {

        return (
            <div className="teacher-root">
                <div className="teacher">
                    <Info teacher={teacher} user={user} cssStyle={false} />
                    <div className="teacher-promotion-card-container">
                        <div style={{ width: "100%" }}>
                            {
                                teacher.promotionRequest && (
                                    <TeacherPromotionRequest
                                        user={user}
                                        showButtons={showButtons}
                                        handleShowButtons={handleShowButtons}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div >
                {user.administrativeRank == 2 &&
                    <PromotionCommittee
                        user={user}
                        promotionRequest={teacher.promotionRequest}
                    />}
            </div>
        )
    }
}

export default Teacher;