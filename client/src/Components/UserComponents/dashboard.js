import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './userContext';
import TeacherInfoCard from './teacherInfoCard';
import TeachersList from './teachersList';
import PromotionCommitteePromotions from '../PromotionCommitteeComponents/promotionCommitteePromotions'
import '../Style/dashboard.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "../../state/actions/teachersActions";
import { setPromotionRequestsForMember, setPromotionRequestsForWiseMember } from "../../state/actions/promotionCommitteeActions"
import Tabs from '../tabs';
import { Redirect } from 'react-router-dom'

function Dashboard() {

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false)

    const teachers = useSelector((state) => state.teachers.teachersList);
    const promotionRequestsList = useSelector((state) => state.promotionCommittee.promotionRequestsList);
    const wisePromotionRequestsList = useSelector((state) => state.promotionCommittee.wisePromotionRequestsList);
    const dispatch = useDispatch();

    useEffect(async () => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""

        setIsLoading(true)

        axios.get(`/user/${user.college}/${user.section}`).
            // await axios.get(`http://localhost:5000/user/${user.college}/${user.section}`).
            then(res => {
                if (res.data.success) {
                    if (res.data.teachers) {
                        dispatch(setTeachers(res.data.teachers));
                    }
                }
            })

        await axios.get(`/promotionCommittee/promotionRequests/${user.id}`).
            // await axios.get(`http://localhost:5000/promotionCommittee/promotionRequests/${user.id}/college`).
            then(res => {
                if (res.data.success) {
                    dispatch(setPromotionRequestsForMember(res.data.result));
                }
            })

        await axios.get(`/promotionCommittee/promotionRequests/${user.id}`).
            // await axios.get(`http://localhost:5000/promotionCommittee/promotionRequests/${user.id}/wise`).
            then(res => {
                if (res.data.success) {
                    dispatch(setPromotionRequestsForWiseMember(res.data.result));
                }
            })

        setIsLoading(false)

    }, [])

    if (user && user.isAdmin) {
        return < Redirect to="/admin" />
    }

    return (
        <main className="dashboard-root">
            <section className="dashboard">
                {user && <TeacherInfoCard teacherData={user} />}
                <Tabs
                    tab1={
                        promotionRequestsList && promotionRequestsList.length > 0 ? <PromotionCommitteePromotions
                            promotionRequestsList={promotionRequestsList}
                            user={user}
                        /> : null
                    }
                    tab1_label={"طلبات الترقية من مجلس التعيين و الترقية / الكلية"}
                    tab2={
                        wisePromotionRequestsList && wisePromotionRequestsList.length > 0 ? <PromotionCommitteePromotions
                            promotionRequestsList={wisePromotionRequestsList}
                            user={user}
                        /> : null
                    }
                    tab2_label={"طلبات الترقية من مجلس التعيين و الترقية / رئاسة الجامعة"}
                    tab3={
                        user.administrativeRank > 0 ?
                            <TeachersList
                                teachers={teachers}
                                user={user}
                            /> : null
                    }
                    tab3_label={"أعضاء الهيئة التدريسية"
                    }

                    activeTab={user.administrativeRank ? 2 : 0}
                    isLoading={isLoading}
                />
            </section>
        </main>
    )
}

export default Dashboard;