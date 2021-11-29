import React, { useContext, useEffect, useState } from 'react';
import PromotionRequestList from '../PromotionComponents/promotionRequestList';
import PromotionRequest from '../PromotionComponents/promotionRequest';
import PromotionRequestCreateForm from '../PromotionComponents/promotionRequestCreateForm';
import { AuthContext } from './userContext';
import TeacherInfoCard from './teacherInfoCard';
import TeachersList from './teachersList';
import '../Style/dashboard.css';
import axios from 'axios';


function Dashboard() {

    const { user } = useContext(AuthContext);
    const [teachers, setTeachers] = useState([]);
    const [promotionRequest, setPromotionRequest] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""

        axios.get(`/user/${user.college}/${user.section}`).
            // axios.get(`http://localhost:5000/user/${user.college}/${user.section}`).
            then(res => {
                if (res.data.success) {
                    setTeachers(res.data.teachers)
                }
            })

        // axios.get(`http://localhost:5000/promotionRequests/${user.promotionRequest._id}`).
        //     then(res => {
        //         if (res.data.success) {
        //             setPromotionRequest(res.data.result)
        //         }
        //     })

    }, [])

    const handleCreatePromotionRequest = (newPromotionRequest) => {
        setPromotionRequest(newPromotionRequest);
    }

    // const handleUpdateTeacherList = (teacher_id, updatedPromotionRequest) => {
    //     const updatedTeacherList = teachers.map(teacher => {
    //         if (teacher._id === teacher_id) {
    //             return { ...teacher, promotionRequest: { ...updatedPromotionRequest } }
    //         }
    //         else {
    //             return teacher
    //         }
    //     })
    //     setTeachers(updatedTeacherList);
    // }

    // const handleRemoveFile = (teacher_id, file_id) => {
    //     const updatedTeacherList = teachers.map(teacher => {
    //         if (teacher._id === teacher_id) {
    //             const updatedFiles = teacher.promotionRequest.files.filter(file => file.uploadId !== file_id)
    //             return { ...teacher, promotionRequest: { ...teacher.promotionRequest, files: updatedFiles } }
    //         }
    //         else {
    //             return teacher
    //         }
    //     })
    //     setTeachers(updatedTeacherList);
    // }

    const handleReject = (teacher_id) => {
        const updatedTeacherList = teachers.map(teacher => {
            if (teacher._id === teacher_id) {
                const updatedPromotionRequest =
                    { ...teacher.promotionRequest, current_phase_number: teacher.promotionRequest.current_phase_number - 1 }
                console.log({ ...teacher, promotionRequest: updatedPromotionRequest })
                return { ...teacher, promotionRequest: updatedPromotionRequest }
            }
            else {
                return teacher
            }
        })
        setTeachers(updatedTeacherList);
    }

    const handleApprove = (teacher_id) => {
        const updatedTeacherList = teachers.map(teacher => {
            if (teacher._id === teacher_id) {
                const updatedPromotionRequest =
                    { ...teacher.promotionRequest, current_phase_number: teacher.promotionRequest.current_phase_number + 1 }
                return { ...teacher, promotionRequest: updatedPromotionRequest }
            }
            else {
                return teacher
            }
        })
        setTeachers(updatedTeacherList);
    }


    return (
        <main className="dashboard-root">
            <section className="dashboard">
                {user && <TeacherInfoCard teacherData={user} />}
                {user.administrativeRank > 0 &&
                    <TeachersList
                        teachers={teachers}
                        user={user}
                        handleReject={handleReject}
                        handleApprove={handleApprove}
                    />
                }
            </section>
        </main>
    )
}

export default Dashboard;