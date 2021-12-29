import React, { useState, useEffect } from 'react';
import SearchableTextField from './searchableTextField ';
import "../Style/promotionCommittee.css";
import axios from 'axios';
import PromotionCommitteeMembers from './promotionCommitteeMembers';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers, setPromotionCommittee, setMembers } from "../../state/actions/promotionCommitteeActions";

function PromotionCommittee({ user, promotionRequest }) {

    const promotionCommittee = useSelector((state) => state.promotionCommittee.promotionCommittee);
    const teachersList = useSelector((state) => state.promotionCommittee.teachers);
    const members = useSelector((state) => state.promotionCommittee.members);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {

        let members = null;
        let teachers = [];

        // await axios.get(`/promotionCommittee/${promotionRequest._id}`).
        await axios.get(`http://localhost:5000/promotionCommittee/${promotionRequest._id}`).
            then(res => {
                if (res.data.success) {
                    setPromotionCommittee(res.data.result)
                    dispatch(setPromotionCommittee(res.data.result))
                    dispatch(setMembers(res.data.result.members))
                    members = res.data.result.members
                }
            })

        // axios.get(`/teachers/${user.college}`).
        axios.get(`http://localhost:5000/teachers/${user.college}`).
            then(res => {
                if (res.data.success) {
                    teachers = res.data.result
                    if (members !== null) {
                        teachers = teachers.map(teacher => {
                            if (members.some(member => member._id === teacher._id)) {
                                return { ...teacher, checked: true }
                            }
                            else {
                                return teacher
                            }
                        })
                    }
                    dispatch(setTeachers(teachers))
                }
            })
    }, [])

    const updatePromotionRequestToCommittee = async () => {

        setIsLoading(true)

        // await axios.put(`/promotionCommittee/${promotionCommittee._id}`, { members: members })
        await axios.put(`http://localhost:5000/promotionCommittee/${promotionCommittee._id}`, { members: members })
            .then(res => {
                if (res.data.success) {
                    toggleEditForm()
                }
            });

        setIsLoading(false)
    }

    const sendPromotionRequestToCommittee = async () => {

        const newPromotionCommittee = {
            members: members,
            promotion_request: promotionRequest
        }

        setIsLoading(true)

        // await axios.post("/promotionCommittee", newPromotionCommittee)
        await axios.post("http://localhost:5000/promotionCommittee", newPromotionCommittee)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionCommittee(res.data.result))
                }
            });

        setIsLoading(false)
    }

    const toggleEditForm = () => {
        setIsEditing(prev => !prev)
    }

    return (
        <div className="promotion-committee">
            <h2>لجنة التثبيت و الترقية</h2>
            {
                promotionCommittee && !isEditing ? (
                    <>
                        <PromotionCommitteeMembers
                            members={members}
                            promotionCommitteeID={promotionCommittee._id}
                            showEditForm={toggleEditForm}
                            user={user}
                            canRemove={false}
                        />
                    </>
                ) : (
                    <>
                        <PromotionCommitteeMembers members={members} canRemove={true} />
                        {members.length === 3 &&
                            (
                                isEditing ? (
                                    <Button
                                        loading={isLoading}
                                        disabled={isLoading}
                                        style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
                                        primary
                                        onClick={updatePromotionRequestToCommittee}
                                    >
                                        حفظ
                                    </Button>
                                ) : (
                                    <Button
                                        loading={isLoading}
                                        disabled={isLoading}
                                        style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
                                        primary
                                        onClick={sendPromotionRequestToCommittee}
                                    >
                                        إرسال الطلب الى اللجنة
                                    </Button>
                                )
                            )
                        }
                        <div className="searchable-textField-container">
                            <SearchableTextField
                                placeholder="اسم عضو هيئة التدريس"
                                optionsList={teachersList}
                            />
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default PromotionCommittee;