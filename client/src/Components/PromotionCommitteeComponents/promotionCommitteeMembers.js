import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setPromotionCommittee, setTeachers, clearSelectedTeachers, removeMember, setMembers } from "../../state/actions/promotionCommitteeActions";

function PromotionCommitteeMembers({ members, promotionCommitteeID, showEditForm, canRemove }) {

    const dispatch = useDispatch();

    const deleteCommittee = () => {

        // axios.post(`/promotionCommittee/${promotionCommitteeID}`)
        axios.delete(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}`)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionCommittee(null))
                    dispatch(clearSelectedTeachers())
                    dispatch(setMembers([]))
                }
            });
    }

    return (
        <div className="promotion-committee-members">
            {
                members.map(member => (
                    <div key={member._id} className="promotion-committee-member">
                        <p>الأسم : {member.full_name}</p>
                        <p>الرقم الوظيفي : {member.teacher_id}</p>
                        <p>التخصص :  {member.section}</p>
                        <p>الرتبة : {member.rank}</p>
                        {canRemove && <span onClick={() => dispatch(removeMember(member._id))}>X</span>}
                    </div>
                ))
            }
            {
                promotionCommitteeID && (
                    <>
                        <Button
                            style={{ backgroundColor: "#D1162C", color: "#fff", marginTop: 20 }}
                            onClick={deleteCommittee}
                        >
                            حذف اللجنة
                        </Button>

                        <Button
                            style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
                            onClick={() => showEditForm()}
                        >
                            تعديل اللجنة
                        </Button>
                    </>
                )
            }
        </div>
    )
}

export default PromotionCommitteeMembers;