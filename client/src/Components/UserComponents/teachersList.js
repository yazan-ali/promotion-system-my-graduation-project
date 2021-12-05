import React from 'react';
import Teacher from './teacher';
import { Divider } from 'semantic-ui-react';
import PromotionRequest from '../PromotionComponents/promotionRequest';

function TeachersList({ teachers, user, handleReject, handleApprove }) {
    return (
        <>
            <Divider style={{ marginBottom: -5 }} horizontal>أعضاء الهيئة التدريسية</Divider>
            <div className="teachers-list">
                {
                    teachers.map(teacher => {
                        return <Teacher
                            key={teacher._id}
                            teacher={teacher}
                            user={user}
                            handleReject={handleReject}
                            handleApprove={handleApprove}
                        />
                    })
                }
            </div>
        </>
    )
}

export default TeachersList;