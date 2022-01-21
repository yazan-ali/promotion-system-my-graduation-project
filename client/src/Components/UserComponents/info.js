import React from 'react';

function Info({ teacher, user, cssStyle, promotionRequestID, showButton }) {

    const showButtonCondition = teacher.promotionRequest && teacher.promotionRequest.current_phase_number === user.administrativeRank

    return (
        <div className={`${cssStyle ? "info" : "info-font-size"}`}>
            <p>الإسم : {teacher.full_name}</p>
            <p>الرقم الوظيفي : {teacher.teacher_id}</p>
            {teacher.rank && <p>الرتبة : {teacher.rank}</p>}
            {teacher.college && <p>الكلية : {teacher.college}</p>}
            {teacher.section && <p>القسم :  {teacher.section}</p>}
            {showButtonCondition && cssStyle &&
                <a href={`/promotion-request/${teacher._id}`}>عرض طلب الترقية</a>
            }

            {showButton &&
                <a href={`/promotion-request/${teacher._id}`}>عرض طلب الترقية</a>
            }

            {promotionRequestID &&
                <a href={`/promotion-committee/promotion-request/${promotionRequestID}`}>عرض طلب الترقية</a>
            }
        </div >
    )
}

export default Info;