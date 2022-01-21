import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers, setTeachersSearchList } from "../../state/actions/teachersActions";
import { Select } from 'semantic-ui-react';
import { collegeOptions, sectionOptions, wise_administratives_ranks } from '../../constants';
import CollegeAdministratives from './collegeAdministratives';
import WiseAdministratives from './wiseAdministratives';
import '../Style/administrative.css';
import Tabs from '../tabs';

function AdministrativeRanksUpdate() {

    const teachers = useSelector((state) => state.teachers);
    const dispatch = useDispatch();

    const [college, setCollege] = useState("");
    const [sections, setSections] = useState("");
    const [wiseAdministrativesRanks, setWiseAdministrativesRanks] = useState("")

    useEffect(() => {
        // axios.get(`/teachers`).
        axios.get(`http://localhost:5000/teachers`).
            then(res => {
                if (res.data.success) {
                    dispatch(setTeachers(res.data.result));
                }
            })
    }, [])

    const handleSelectCollege = (evt, data) => {
        setCollege(data.value)
        data.options.map(option => {
            if (option.value === data.value) {
                setSections(option.key)
            }
        })
        const teachersSearchList = teachers.teachersList.filter(teacher => teacher.college === data.value)
        dispatch(setTeachersSearchList(teachersSearchList))
    }

    const handleWiseAdministrativesRank = (evt, data) => {
        setWiseAdministrativesRanks(data.value)
        dispatch(setTeachersSearchList(teachers.teachersList))
    }

    return (
        <div className="administrative-ranks-update">
            <Tabs
                tab1={
                    <div className='administrative-root'>
                        <h2 style={{ paddingBottom: 20 }}>تعديل عميد أو رئيس قسم</h2>
                        <Select
                            className="select"
                            placeholder='اختر الكلية'
                            options={collegeOptions}
                            onChange={handleSelectCollege}
                        />
                        <CollegeAdministratives
                            administratives={teachers.collegeAdministratives}
                            college={college}
                            sections={sectionOptions[sections]}
                        />
                    </div>
                }
                tab1_label={"العمادة و رؤساء الاقسام"}
                tab2={
                    <div className='administrative-root'>
                        <h2 style={{ paddingBottom: 20 }}>تعديل المشرفين</h2>
                        <Select
                            className="select"
                            placeholder='اختر'
                            options={wise_administratives_ranks}
                            onChange={handleWiseAdministrativesRank}
                        />
                        <WiseAdministratives selectedRank={wiseAdministrativesRanks} />
                    </div>
                }
                tab2_label={"الرئاسة"}
                activeTab={1}
            />
        </div>
    )
}

export default AdministrativeRanksUpdate;