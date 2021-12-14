// import React, { useState, useEffect } from 'react';
// import SearchableTextField from './searchableTextField ';
// import "../Style/promotionCommittee.css";
// import axios from 'axios';
// import PromotionCommitteeMembers from './promotionCommitteeMembers';
// import { Button } from 'semantic-ui-react';
// import { useDispatch, useSelector } from "react-redux";
// import { setTeachers } from "../../state/actions/promotionCommitteeActions";

// function PromotionCommittee({ user, promotionRequest }) {

//     // const teachers = promotionCommittee.teachers
//     const teachersList = useSelector((state) => state.promotionCommittee.teachers);
//     const dispatch = useDispatch();


//     const [promotionCommittee, setPromotionCommittee] = useState(null);
//     const [members, setMembers] = useState([])
//     const [options, setOptions] = useState(teachersList)
//     const [isEditing, setIsEditing] = useState(false)

//     useEffect(() => {
//         axios.get(`http://localhost:5000/promotionCommittee/${promotionRequest._id}`).
//             then(res => {
//                 if (res.data.success) {
//                     setPromotionCommittee(res.data.result)
//                     setMembers(res.data.result.members)
//                 }
//             })

//         axios.get(`http://localhost:5000/teachers/${user.college}`).
//             then(res => {
//                 if (res.data.success) {
//                     dispatch(setTeachers(res.data.result))
//                     // setOptions(res.data.result)
//                 }
//             })
//     }, [])

//     const addMember = (member) => {

//         if (members.some(m => m._id === member._id)) return

//         if (members.length < 3) {
//             setMembers([...members, member])
//         }
//     }

//     const removeMember = (id) => {

//         const newMembers = members.filter(member => member._id !== id)
//         setMembers(newMembers)
//     }

//     const updateMembers = (member) => {

//         const newOptions = options.map(option => {
//             if (option._id === member._id) {
//                 return member
//             } else {
//                 return option
//             }
//         })

//         setOptions(newOptions)

//         if (member.checked) {
//             addMember(member)
//         } else {
//             removeMember(member._id)
//         }
//     }

//     const updatePromotionRequestToCommittee = () => {

//         axios.put(`http://localhost:5000/promotionCommittee/${promotionCommittee._id}`, { members: members })
//             .then(res => {
//                 if (res.data.success) {
//                     toggleEditForm()
//                 }
//             });
//     }

//     const sendPromotionRequestToCommittee = () => {

//         const newPromotionCommittee = {
//             members: members,
//             promotion_request: promotionRequest
//         }
//         // axios.post("/promotionCommittee", newPromotionCommittee)
//         axios.post("http://localhost:5000/promotionCommittee", newPromotionCommittee)
//             .then(res => {
//                 if (res.data.success) {
//                     setPromotionCommittee(res.data.result)
//                 }
//             });
//     }

//     const toggleEditForm = () => {
//         setIsEditing(prev => !prev)
//     }

//     return (
//         <div className="promotion-committee">
//             <h2>لجنة التثبيت و الترقية</h2>
//             {
//                 promotionCommittee && !isEditing ? (
//                     <>
//                         <h3>يتم مراجعة الطلب من قبل اعضاء اللجنة</h3>
//                         <PromotionCommitteeMembers
//                             members={members}
//                             promotionCommitteeID={promotionCommittee._id}
//                             setPromotionCommittee={setPromotionCommittee}
//                             setMembers={setMembers}
//                             showEditForm={toggleEditForm}
//                         />
//                     </>
//                 ) : (
//                     <>
//                         <PromotionCommitteeMembers members={members} removeMember={removeMember} />
//                         {members.length === 3 &&
//                             (
//                                 isEditing ? (
//                                     <Button
//                                         style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
//                                         primary
//                                         onClick={updatePromotionRequestToCommittee}
//                                     >
//                                         حفظ
//                                     </Button>
//                                 ) : (
//                                     <Button
//                                         style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
//                                         primary
//                                         onClick={sendPromotionRequestToCommittee}
//                                     >
//                                         إرسال الطلب الى اللجنة
//                                     </Button>
//                                 )
//                             )
//                         }
//                         <SearchableTextField
//                             placeholder="اسم عضو هيئة التدريس"
//                             optionsList={teachersList}
//                             updateOptions={updateMembers}
//                             user={user}
//                         />
//                     </>
//                 )
//             }
//         </div >
//     )
// }

// export default PromotionCommittee;


import React, { useState, useEffect } from 'react';
import SearchableTextField from './searchableTextField ';
import "../Style/promotionCommittee.css";
import axios from 'axios';
import PromotionCommitteeMembers from './promotionCommitteeMembers';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers, setPromotionCommittee, setMembers, setMember, removeMember } from "../../state/actions/promotionCommitteeActions";

function PromotionCommittee({ user, promotionRequest }) {

    const promotionCommittee = useSelector((state) => state.promotionCommittee.promotionCommittee);
    const teachersList = useSelector((state) => state.promotionCommittee.teachers);
    const members = useSelector((state) => state.promotionCommittee.members);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {

        let members = null;
        let teachers = [];

        axios.get(`http://localhost:5000/promotionCommittee/${promotionRequest._id}`).
            then(res => {
                if (res.data.success) {
                    setPromotionCommittee(res.data.result)
                    dispatch(setPromotionCommittee(res.data.result))
                    dispatch(setMembers(res.data.result.members))
                    members = res.data.result.members
                }
            })

        axios.get(`http://localhost:5000/teachers/${user.college}`).
            then(res => {
                if (res.data.success) {
                    teachers = res.data.result
                    if (members) {
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

    const updatePromotionRequestToCommittee = () => {

        axios.put(`http://localhost:5000/promotionCommittee/${promotionCommittee._id}`, { members: members })
            .then(res => {
                if (res.data.success) {
                    toggleEditForm()
                }
            });
    }

    const sendPromotionRequestToCommittee = () => {

        const newPromotionCommittee = {
            members: members,
            promotion_request: promotionRequest
        }
        // axios.post("/promotionCommittee", newPromotionCommittee)
        axios.post("http://localhost:5000/promotionCommittee", newPromotionCommittee)
            .then(res => {
                if (res.data.success) {
                    dispatch(setPromotionCommittee(res.data.result))
                }
            });
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
                        <h3>يتم مراجعة الطلب من قبل اعضاء اللجنة</h3>
                        <PromotionCommitteeMembers
                            members={members}
                            promotionCommitteeID={promotionCommittee._id}
                            showEditForm={toggleEditForm}
                        />
                    </>
                ) : (
                    <>
                        <PromotionCommitteeMembers members={members} canRemove={true} />
                        {members.length === 3 &&
                            (
                                isEditing ? (
                                    <Button
                                        style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
                                        primary
                                        onClick={updatePromotionRequestToCommittee}
                                    >
                                        حفظ
                                    </Button>
                                ) : (
                                    <Button
                                        style={{ backgroundColor: "#1FBDC7", color: "#fff", marginTop: 20 }}
                                        primary
                                        onClick={sendPromotionRequestToCommittee}
                                    >
                                        إرسال الطلب الى اللجنة
                                    </Button>
                                )
                            )
                        }
                        <SearchableTextField
                            placeholder="اسم عضو هيئة التدريس"
                            optionsList={teachersList}
                        />
                    </>
                )
            }
        </div >
    )
}

export default PromotionCommittee;