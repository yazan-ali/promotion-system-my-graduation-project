import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

function Info({ teacher, user, cssStyle }) {

    const showButtonCondition = teacher.promotionRequest && teacher.promotionRequest.current_phase_number === user.administrativeRank

    return (
        <div className={`${cssStyle ? "info" : "info-font-size"}`}>
            <p>الإسم : {teacher.full_name}</p>
            <p>الرقم الوظيفي : {teacher.teacher_id}</p>
            <p>الرتبة : {teacher.rank}</p>
            <p>الكلية : {teacher.college}</p>
            <p>القسم :  {teacher.section}</p>
            {showButtonCondition &&
                <Button
                    type="button"
                    primary
                    style={{ backgroundColor: "#098D9C" }}
                >
                    <Link to={`/promotion-request/${teacher._id}`}>عرض طلب الترقية</Link>
                </Button>
            }
        </div >
    )
}

export default Info;