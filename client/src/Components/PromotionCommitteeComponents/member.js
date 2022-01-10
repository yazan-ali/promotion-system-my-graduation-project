import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import MemberApproveButton from './memberApproveButton'
import MemberRejectionButton from './memberRejectionButton'
import RejectionReasons from '../PromotionComponents/rejectionReasons'
import { useDispatch } from "react-redux";
import { removeMember } from "../../state/actions/promotionCommitteeActions";
import { memberDecision } from '../../constants'

function Member({ member, promotionCommitteeID, canRemove, user }) {

    const dispatch = useDispatch();

    const [showRejectionReasonsForm, setShowRejectionReasonsForm] = useState(false);
    const [showButtons, setShowButtons] = useState(!member.memberDecision ? true : false);

    const showForm = () => {
        setShowRejectionReasonsForm(prev => !prev)
    }

    const handleShowButtons = () => {
        setShowButtons(prev => !prev)
    }


    return (
        <div key={member._id} className="promotion-committee-member">
            <p>الأسم : {member.full_name}</p>
            <p>الرقم الوظيفي : {member.teacher_id}</p>
            {member.section && <p>التخصص :  {member.section}</p>}
            {member.rank && <p>الرتبة : {member.rank}</p>}
            <>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {promotionCommitteeID && member._id === user.id &&
                        <span
                            onClick={handleShowButtons}
                            style={{ marginRight: 15, cursor: "pointer" }}>
                            <i className="fas fa-pen"></i>
                        </span>
                    }
                    <p style={{
                        color: member.memberDecision ?
                            member.memberDecision === "approved" ? "green" : "#D90000"
                            : "#686868"
                    }}>
                        {
                            !member.memberDecision ? "بإنتظار المراجعة" : memberDecision[member.memberDecision]
                        }
                    </p>
                </div>
                <RejectionReasons
                    reasons={member.rejectionReasons}
                    showForm={showRejectionReasonsForm}
                    showButtons={showButtons}
                    memberID={member._id}
                    isAdministrative={true}
                />
                {
                    promotionCommitteeID && user.id === member._id && showButtons && (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            {
                                showRejectionReasonsForm ? (
                                    <MemberRejectionButton
                                        promotionCommitteeID={promotionCommitteeID}
                                        handleShowButtons={handleShowButtons}
                                        rejectionReasons={member.rejectionReasons}
                                        memberID={member._id}
                                    />
                                ) : (
                                    <Button style={{ backgroundColor: "#D1162C", color: "#fff" }} onClick={showForm}>
                                        رفض
                                    </Button>
                                )
                            }
                            <MemberApproveButton
                                promotionCommitteeID={promotionCommitteeID}
                                handleShowButtons={handleShowButtons}
                                memberID={member._id}
                            />
                        </div>
                    )}
            </>
            {canRemove && <Button
                style={{ backgroundColor: "#D1162C", color: "#fff", marginTop: "auto", width: 100 }}
                onClick={() => dispatch(removeMember(member._id))}
            >حذف
            </Button>}
        </div>
    )
}

export default Member;