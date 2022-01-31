import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import Member from './member';
import { useDispatch } from "react-redux";
import { setPromotionCommittee, clearSelectedTeachers, setMembers } from "../../state/actions/promotionCommitteeActions";

function PromotionCommitteeMembers({ members, promotionCommitteeID, showEditForm, user, canRemove, numOfMembers }) {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const deleteCommittee = async () => {

        setIsLoading(true)

        // axios.delete(`/promotionCommittee/${promotionCommitteeID}`)
        axios.delete(`http://localhost:5000/promotionCommittee/${promotionCommitteeID}`)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionCommittee(null))
                    dispatch(clearSelectedTeachers())
                    dispatch(setMembers([]))
                }
            });

        setIsLoading(false)
    }

    return (
        <div style={{ width: "100%" }}>
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
            </div>
            {
                promotionCommitteeID && (user.administrativeRank == 2 || user.administrativeRank === 5) && (
                    <div>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
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
                    </div>
                )
            }
        </div >
    )
}

export default PromotionCommitteeMembers;