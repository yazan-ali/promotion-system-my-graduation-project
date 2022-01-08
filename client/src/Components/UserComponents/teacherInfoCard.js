import React from 'react';
import '../Style/dashboard.css';
import PromotionRequestList from '../PromotionComponents/promotionRequestList';
import { ranks } from '../../constants';

function TeacherInfoCard({ teacherData }) {

    return (
        <div className="teacher-card-root">
            <PromotionRequestList user={teacherData} />
            <div className="teacher-card">
                <i className="fas fa-user-circle"></i>
                <p>{teacherData.full_name}</p>
                {
                    teacherData.administrativeRank > 0 && (
                        teacherData.administrativeRank === 1 ? (
                            <p > {`رئيس قسم ${teacherData.section}`}</p>
                        ) : teacherData.administrativeRank === 2 ? (
                            <p > {`عميد كلية ${teacherData.college}`}</p>
                        ) : (
                            <p > {`${ranks[teacherData.administrativeRank]}`}</p>
                        )
                    )
                }
                <p>الرقم الوظيفي : {teacherData.teacher_id}</p>
                {teacherData.rank && <p>الرتبة : {teacherData.rank}</p>}
                {teacherData.college && <p>الكلية : {teacherData.college}</p>}
                {teacherData.section && <p>القسم :  {teacherData.section}</p>}
            </div>
        </div>
    )
}

export default TeacherInfoCard;