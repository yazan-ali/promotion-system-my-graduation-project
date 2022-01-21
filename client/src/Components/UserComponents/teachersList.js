import React from 'react';
import Info from './info';

function TeachersList({ teachers, user, showButton }) {
    return (
        <>
            <div className="teachers-list">
                {
                    teachers.map(teacher => (
                        <Info
                            key={teacher._id}
                            teacher={teacher}
                            user={user}
                            cssStyle={true}
                            showButton={showButton}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default TeachersList;