import React, { useState, useEffect } from 'react';
import { Button, Form, Select } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers, setCollegeAdministratives, setTeachersSearchList } from "../../state/actions/teachersActions";
import SearchableTextField from '../PromotionCommitteeComponents/searchableTextField ';
import axios from 'axios';

function AdministrativeInfo({ rank, college, section }) {

    const searchList = useSelector((state) => state.teachers.teachersSearchList);
    const dispatch = useDispatch();

    const [currentAdministrative, setCurrentAdministrative] = useState(null)
    const [newAdministrative, setNewAdministrative] = useState(null)
    const [showSearchField, setShowSearchField] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/administrative/${college}/${section ? section : "none"}/${rank}`).
            then(res => {
                if (res.data.success) {
                    setCurrentAdministrative(res.data.result);
                    setNewAdministrative(null);
                    setShowSearchField(false)
                } else {
                    setCurrentAdministrative(null);
                    setNewAdministrative(null);
                    setShowSearchField(true)
                }
            })
    }, [college])

    const SelectNewAdministrative = (teacher) => {
        setNewAdministrative(teacher)
        toggleSearchField()
    }

    const toggleSearchField = () => {
        setShowSearchField(prev => !prev)
    }

    const handleSubmit = () => {

        const data = {
            prev_administrative_id: currentAdministrative ? currentAdministrative._id : null,
            new_administrative_id: newAdministrative._id,
            administrativeRank: rank,
        }

        // axios.post("/register", newUser)
        axios.put("http://localhost:5000/administrative", data)
            .then(res => {
                if (res.data.success) {
                    toggleSearchField()
                    setCurrentAdministrative(newAdministrative)
                    setNewAdministrative(null)
                }
            });
    }

    return (
        <div className="administrative-info">
            {rank === 1 && <h3 style={{ textAlign: "center" }}>رئيس قسم {section}</h3>}
            {rank === 2 && <h3 style={{ textAlign: "center" }}>عميد كلية {college}</h3>}
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" }}>
                <div style={{
                    width: currentAdministrative || newAdministrative && "50%",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {newAdministrative ?
                        <>
                            <p>الإسم : {newAdministrative.full_name}</p>
                            <p>الرقم الوظيفي : {newAdministrative.teacher_id}</p>
                            <p> الرتبة : {newAdministrative.rank}</p>
                        </> : currentAdministrative && <>
                            <p>الإسم : {currentAdministrative.full_name}</p>
                            <p>الرقم الوظيفي : {currentAdministrative.teacher_id}</p>
                            <p> الرتبة : {currentAdministrative.rank}</p>
                        </>
                    }
                </div>
                {showSearchField && <div style={{ width: currentAdministrative || newAdministrative ? "70%" : "100%" }}>
                    <SearchableTextField
                        optionsList={searchList}
                        placeholder={"اسم المستخدم"}
                        selectOption={SelectNewAdministrative}
                    />
                </div>
                }
            </div>

            <div style={{ marginTop: "2rem" }}>
                <Button onClick={toggleSearchField} style={{ backgroundColor: "#098D9C" }} primary>
                    {`${showSearchField ? "إلغاء" : "تغيير"}`}
                </Button>
                {newAdministrative && <Button onClick={handleSubmit} style={{ backgroundColor: "#098D9C" }} primary>حفظ</Button>}
            </div>
        </div>
    )
}


export default AdministrativeInfo;