import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './userContext';
import TeacherInfoCard from './teacherInfoCard';
import TeachersList from './teachersList';
import PromotionCommitteePromotions from '../PromotionCommitteeComponents/promotionCommitteePromotions'
import '../Style/dashboard.css';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "../../state/actions/teachersActions";
import { setPromotionRequestsForMember } from "../../state/actions/promotionCommitteeActions"
import Tabs from '../tabs';


function Dashboard() {

    const { user } = useContext(AuthContext);

    const teachers = useSelector((state) => state.teachersList);
    const promotionRequestsList = useSelector((state) => state.promotionCommittee.promotionRequestsList);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""

        // axios.get(`/user/${user.college}/${user.section}`).
        axios.get(`http://localhost:5000/user/${user.college}/${user.section}`).
            then(res => {
                if (res.data.success) {
                    if (res.data.teachers) {
                        dispatch(setTeachers(res.data.teachers));
                    }
                }
            })


        axios.get(`http://localhost:5000/promotionCommittee/promotionRequests/${user.id}`).
            then(res => {
                if (res.data.success) {
                    dispatch(setPromotionRequestsForMember(res.data.result));
                }
            })
    }, [])

    return (
        <main className="dashboard-root">
            <section className="dashboard">
                {user && <TeacherInfoCard teacherData={user} />}
                {/* {user.administrativeRank > 0 &&
                    <TeachersList
                        teachers={teachers}
                        user={user}
                    />
                } */}
                <Tabs
                    TeachersList={
                        user.administrativeRank > 0 ?
                            <TeachersList
                                teachers={teachers}
                                user={user}
                            /> : null
                    }
                    PromotionCommitteePromotions={
                        promotionRequestsList && promotionRequestsList.length > 0 ? <PromotionCommitteePromotions
                            promotionRequestsList={promotionRequestsList}
                            user={user}
                        /> : null
                    }
                />
            </section>
        </main>
    )
}

export default Dashboard;