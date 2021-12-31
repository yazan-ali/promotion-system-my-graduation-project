import React, { useState, useEffect } from 'react';
import { Button, Form, Select } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setTeachers, setCollegeAdministratives, setTeachersSearchList } from "../../state/actions/teachersActions";
import SearchableTextField from '../PromotionCommitteeComponents/searchableTextField ';
import axios from 'axios';
import Loader from '../loader';

function Administrative({ rank, college, section }) {

    const searchList = useSelector((state) => state.teachers.teachersSearchList);
    const dispatch = useDispatch();

    const [currentAdministrative, setCurrentAdministrative] = useState(null)
    const [newAdministrative, setNewAdministrative] = useState(null)
    const [showSearchField, setShowSearchField] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {

        setIsLoading(true)

        await axios.get(`/administrative/${college ? college : "none"}/${section ? section : "none"}/${rank}`).
            // await axios.get(`http://localhost:5000/administrative/${college ? college : "none"}/${section ? section : "none"}/${rank}`).
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

        setIsLoading(false)

    }, [college, rank])

    const SelectNewAdministrative = (teacher) => {
        setNewAdministrative(teacher)
        toggleSearchField()
    }

    const toggleSearchField = () => {
        setShowSearchField(prev => !prev)
    }

    const handleSubmit = async () => {

        const data = {
            prev_administrative_id: currentAdministrative ? currentAdministrative._id : null,
            new_administrative_id: newAdministrative._id,
            administrativeRank: rank,
        }

        setIsLoading(true)

        await axios.put("/administrative", data)
            // await axios.put("http://localhost:5000/administrative", data)
            .then(res => {
                if (res.data.success) {
                    setCurrentAdministrative(newAdministrative)
                    setNewAdministrative(null)
                }
            });

        setIsLoading(false)

    }

    return (
        <div className="administrative-info">
            {isLoading ? (
                <Loader color={"gray"} size={"medium"} />
            ) : (
                <>
                    {rank === 1 && <h3 style={{ textAlign: "center" }}>رئيس قسم {section}</h3>}
                    {rank === 2 && <h3 style={{ textAlign: "center" }}>عميد كلية {college}</h3>}
                    {rank === 3 && <h3 style={{ textAlign: "center" }}>رئاسة الجامعة</h3>}
                    {rank === 4 && <h3 style={{ textAlign: "center" }}>أمانة سر المجالس</h3>}
                    {rank === 5 && <h3 style={{ textAlign: "center" }}>لجنة التعين والترقية</h3>}
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        {showSearchField && <div style={{ width: "100%", marginTop: "2rem" }}>
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
                        {newAdministrative &&
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                onClick={handleSubmit}
                                style={{ backgroundColor: "#098D9C" }}
                                primary>حفظ
                            </Button>}
                    </div>
                </>
            )}
        </div>
    )
}


export default Administrative;