import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import MemberApproveButton from './memberApproveButton'
import MemberRejectionButton from './memberRejectionButton'
import RejectionReasons from '../PromotionComponents/rejectionReasons'
import Member from './member';
import { useDispatch } from "react-redux";
import { setPromotionCommittee, setTeachers, clearSelectedTeachers, removeMember, setMembers } from "../../state/actions/promotionCommitteeActions";

function PromotionCommitteeMembers({ members, promotionCommitteeID, showEditForm, user, canRemove }) {

    const dispatch = useDispatch();

    // const [showRejectionReasonsForm, setShowRejectionReasonsForm] = useState(false);
    // const [showButtons, setShowButtons] = useState(false);

    // const showForm = () => {
    //     setShowRejectionReasonsForm(prev => !prev)
    // }

    // const handleShowButtons = () => {
    //     setShowButtons(prev => !prev)
    // }

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
                    <Member
                        member={member}
                        promotionCommitteeID={promotionCommitteeID}
                        canRemove={canRemove}
                        user={user}
                    />
                ))
            }
            {
                promotionCommitteeID && user.administrativeRank == 2 && (
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
        </div >
    )
}

export default PromotionCommitteeMembers;