import React, { useState } from 'react';
import TeacherPromotionRequest from '../PromotionComponents/teacherPromotionRequest';
import { Button } from 'semantic-ui-react';

function Teacher({ teacher, user, handleReject, handleApprove }) {

    const [showPromotionRequest, setShowPromotionRequest] = useState(false);
    const showButtonCondition = teacher.promotionRequest && teacher.promotionRequest.current_phase_number === user.administrativeRank

    const handleTogglePromotionRequest = (id) => {
        setShowPromotionRequest(prev => !prev)
    }

    const handleUpdatePromotionRequest = (file_id, teacher_id, updatedPromotionRequest) => {
        handleUpdatePromotionRequest(file_id, teacher_id, updatedPromotionRequest)
    }

    return (
        <div className="teacher" style={{ width: showPromotionRequest && "100%", transition: "0.3s  ease-in-out" }}>
            <div id={teacher._id}>
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
                            </>
                        )
                        }
                    </Button>
                }
            </div >
            <div className="teacher-promotion-card-container">
                {
                    showPromotionRequest && (
                        <div style={{ width: "100%" }}>
                            {
                                teacher.promotionRequest && (
                                    <TeacherPromotionRequest
                                        promotionRequest={teacher.promotionRequest}
                                        requestOwner={false}
                                        user={user}
                                        scroll_to={teacher._id}
                                        handleReject={handleReject}
                                        handleApprove={handleApprove}
                                        handleTogglePromotionRequest={handleTogglePromotionRequest}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Teacher;
