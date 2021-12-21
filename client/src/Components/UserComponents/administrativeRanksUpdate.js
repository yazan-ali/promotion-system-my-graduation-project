import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers, setCollegeAdministratives, setTeachersSearchList } from "../../state/actions/teachersActions";
import { Button, Form, Select } from 'semantic-ui-react';
import { collegeOptions, sectionOptions } from '../../constants';
import CollegeAdministratives from './collegeAdministratives';
import '../Style/administrative.css';

function AdministrativeRanksUpdate() {

    const teachers = useSelector((state) => state.teachers);
    const dispatch = useDispatch();

    const [college, setCollege] = useState("");
    const [sections, setSections] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/teachers`).
            then(res => {
                if (res.data.success) {
                    dispatch(setTeachers(res.data.result));
                }
            })
    }, [])

    useEffect(() => {
        fileterCollegeTeachers()
    }, [college])

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

    const fileterCollegeTeachers = () => {
        const collegeAdministratives = teachers.teachersList.filter(teacher =>
            teacher.college === college && teacher.administrativeRank < 3 && teacher.administrativeRank > 0
        )
        dispatch(setCollegeAdministratives(collegeAdministratives))
    }


    return (
        <div className="administrative-ranks-update">
            <Form.Field>
                <label>الكلية</label>
                <Select
                    className="login-select"
                    placeholder='اختر الكلية'
                    options={collegeOptions}
                    onChange={handleSelectCollege}
                />
            </Form.Field>
            <CollegeAdministratives
                administratives={teachers.collegeAdministratives}
                college={college}
                sections={sectionOptions[sections]}
            />
        </div>
    )
}

export default AdministrativeRanksUpdate;