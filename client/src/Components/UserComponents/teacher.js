import React, { useState, useEffect, useContext } from 'react';
import TeacherPromotionRequest from '../PromotionComponents/teacherPromotionRequest';
import { Button } from 'semantic-ui-react';
import { AuthContext } from './userContext';
import Info from './info';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PromotionCommittee from '../PromotionCommitteeComponents/promotionCommittee';

// function Teacher({ props, handleReject, handleApprove }) {
function Teacher(props, { handleReject, handleApprove }) {

    const { user } = useContext(AuthContext);


    const [teacher, setTeacher] = useState(null);
    const [showPromotionRequest, setShowPromotionRequest] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    // const showButtonCondition = teacher.promotionRequest && teacher.promotionRequest.current_phase_number === user.administrativeRank

    const teacherID = props.match.params.id

    useEffect(() => {

        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""

        axios.get(`http://localhost:5000/teacher/${teacherID}`).
            then(res => {
                if (res.data.success) {
                    setTeacher(res.data.result)
                }
            })
    }, [])

    const handleTogglePromotionRequest = (id) => {
        setShowPromotionRequest(prev => !prev)
    }

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
                    {/* <div id={teacher._id}>
                    <p>{teacher.full_name}</p>
                    <p>الرقم الوظيفي : {teacher.teacher_id}</p>
                    <p>الرتبة : {teacher.rank}</p>
                    <p>الكلية : {teacher.college}</p>
                    <p>القسم :  {teacher.section}</p>
                    {showButtonCondition &&
                        <Button
                            type="button"
                            primary
                            style={{ backgroundColor: "#098D9C" }}
                            onClick={() => handleTogglePromotionRequest(teacher._id)}
                        >
                            {showPromotionRequest ? (
                                <>
                                    <span style={{ marginRight: 10 }}> <i className="fas fa-eye-slash"></i></span>
                                    <span>إخفاء طلب الترقية</span>
                                </>
                            ) : (
                                <>
                                    <span style={{ marginRight: 10 }}> <i className="fas fa-eye"></i></span>
                                    <span>عرض طلب الترقية</span>
                                    {teacher.promotionRequest && <a href={`/promotion-request/${teacher.promotionRequest._id}`}>عرض الطلب</a>}
                                </>
                            )
                            }
                        </Button>
                    }
                </div > */}
                    <Info teacher={teacher} user={user} cssStyle={false} />
                    <div className="teacher-promotion-card-container">
                        <div style={{ width: "100%" }}>
                            {
                                teacher.promotionRequest && (
                                    <TeacherPromotionRequest
                                        promotionRequest={teacher.promotionRequest}
                                        requestOwner={false}
                                        user={user}
                                        scroll_to={teacher._id}
                                        showButtons={showButtons}
                                        handleShowButtons={handleShowButtons}
                                        handleTogglePromotionRequest={handleTogglePromotionRequest}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div >
                <PromotionCommittee user={user} promotionRequest={teacher.promotionRequest} />
            </div>
        )
    }
}

export default Teacher;