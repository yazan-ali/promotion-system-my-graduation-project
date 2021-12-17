import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { addRejectionReason, removeRejectionReason } from "../../state/actions/teacherDataActions";
import { addMemberRejectionReason, removeMemberRejectionReason } from '../../state/actions/promotionCommitteeActions'
import uuid from 'uuid/dist/v4';

function RejectionReasons({ isAdministrative, showForm, showButtons, reasons, memberID }) {

    const dispatch = useDispatch();

    const [reason, setReason] = useState("");

    const handleRejectionReasonsInputChange = (evt) => {
        setReason(evt.target.value);
    }

    const handleAddRejectionReason = () => {
        if (reason === "") return
        if (!memberID) {
            dispatch(addRejectionReason({ reason, id: uuid() }))
        } else {
            dispatch(addMemberRejectionReason({ rejection_reason: { reason, id: uuid() }, member_id: memberID }))
        }
        setReason("");
    }

    const handleRemoveRejectionReason = (id) => {
        if (!memberID) {
            dispatch(removeRejectionReason(id))
        } else {
            dispatch(removeMemberRejectionReason({ member_id: memberID, reason_id: id }))
        }
    }

    return (
        <div className="accordion">
            {showForm && showButtons && <Form style={{ paddingTop: 10 }} onSubmit={handleAddRejectionReason}>
                <Form.Field>
                    <input
                        style={{ textAlign: "end" }}
                        placeholder={`${reasons.length > 0 ? "إضافة سبب آخر" : "ادخل سبب الرفض"}`}
                        name="rejection_reason"
                        value={reason}
                        onChange={handleRejectionReasonsInputChange}
                    />
                </Form.Field>
                <Button onClick={handleAddRejectionReason} type='button'>+</Button>
            </Form>
            }
            {reasons.length > 0 &&
                <>
                    <div className="accordion-btn">
                        <p>
                            <i className="fas fa-exclamation-triangle"></i>
                            {memberID ? "أسباب الرفض" : "يرجى تعديل الآتي لإستكمال إجراءات الطلب"}
                        </p>
                    </div>

                    <ul>
                        {
                            reasons.map(reason => (
                                <li key={reason.id} >
                                    {reason.reason}
                                    {isAdministrative && showButtons && <i
                                        className="fas fa-times"
                                        style={{ marginRight: 20, cursor: 'pointer' }}
                                        onClick={() => handleRemoveRejectionReason(reason.id)}></i>}
                                </li>
                            ))
                        }
                    </ul>
                </>
            }
        </div >
    )
}

export default RejectionReasons;