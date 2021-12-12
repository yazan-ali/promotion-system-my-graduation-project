import React, { useState, useEffect } from 'react';
import SearchableTextField from './searchableTextField ';
import "../Style/promotionCommittee.css";
import axios from 'axios';
import PromotionCommitteeMembers from './promotionCommitteeMembers';
import { Button } from 'semantic-ui-react';

function PromotionCommittee({ user, promotionRequest }) {

    const [promotionCommittee, setPromotionCommittee] = useState(null);
    const [members, setMembers] = useState([])
    const [options, setOptions] = useState([])
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/promotionCommittee/${promotionRequest._id}`).
            then(res => {
                if (res.data.success) {
                    setPromotionCommittee(res.data.result)
                    setMembers(res.data.result.members)
                }
            })

        axios.get(`http://localhost:5000/teachers/${user.college}`).
            then(res => {
                if (res.data.success) {
                    setOptions(res.data.result)
                }
            })
    }, [])

    const addMember = (member) => {

        if (members.some(m => m._id === member._id)) return

        if (members.length < 3) {
            setMembers([...members, member])
        }
    }

    const removeMember = (id) => {

        const newMembers = members.filter(member => member._id !== id)
        setMembers(newMembers)
    }

    const updateMembers = (member) => {

        const newOptions = options.map(option => {
            if (option._id === member._id) {
                return member
            } else {
                return option
            }
        })

        setOptions(newOptions)

        if (member.checked) {
            addMember(member)
        } else {
            removeMember(member._id)
        }
    }

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
                    setPromotionCommittee(res.data.result)
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
                            setPromotionCommittee={setPromotionCommittee}
                            setMembers={setMembers}
                            showEditForm={toggleEditForm}
                        />
                    </>
                ) : (
                    <>
                        <PromotionCommitteeMembers members={members} removeMember={removeMember} />
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
                            optionsList={options}
                            updateOptions={updateMembers}
                            user={user}
                        />
                    </>
                )
            }
        </div >
    )
}

export default PromotionCommittee;


// import React, { useState, useEffect } from 'react';
// import SearchableTextField from './searchableTextField ';
// import "../Style/promotionCommittee.css";
// import axios from 'axios';
// import PromotionCommitteeMembers from './promotionCommitteeMembers';
// import { Button } from 'semantic-ui-react';

// function PromotionCommittee({ user, promotionRequest }) {

//     const [promotionCommittee, setPromotionCommittee] = useState(null);
//     const [members, setMembers] = useState([])
//     const [options, setOptions] = useState([])
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
//                     setOptions(res.data.result)
//                 }
//             })
//     }, [])

//     const addMember = (member) => {

//         if (members.some(m => m._id === member._id)) return

//         if (members.length < 3) {
//             setMembers([...members, member])

//             const newOptions = options.filter(option => option._id !== member._id)
//             setOptions(newOptions)
//         }
//     }

//     const removeMember = (memberData) => {

//         const newMembers = members.filter(member => member._id !== memberData._id)
//         setMembers(newMembers)

//         setOptions([...options, memberData])
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
//                             optionsList={options}
//                             addMember={addMember}
//                             user={user}
//                         />
//                     </>
//                 )
//             }
//         </div >
//     )
// }

// export default PromotionCommittee;