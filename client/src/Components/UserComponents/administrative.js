import React, { useState, useEffect } from 'react';
import { Button, } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import SearchableTextField from '../PromotionCommitteeComponents/searchableTextField ';
import axios from 'axios';
import Loader from '../loader';

function Administrative({ rank, college, section }) {

    const searchList = useSelector((state) => state.teachers.teachersSearchList);

    const [currentAdministrative, setCurrentAdministrative] = useState(null)
    const [newAdministrative, setNewAdministrative] = useState(null)
    const [showSearchField, setShowSearchField] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {

        setIsLoading(true)

        // await axios.get(`/administrative/${college ? college : "none"}/${section ? section : "none"}/${rank}`).
        await axios.get(`http://localhost:5000/administrative/${college ? college : "none"}/${section ? section : "none"}/${rank}`).
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
                    {rank === 1 && <h3 style={{ textAlign: "center" }}>???????? ?????? {section}</h3>}
                    {rank === 2 && <h3 style={{ textAlign: "center" }}>???????? ???????? {college}</h3>}
                    {rank === 3 && <h3 style={{ textAlign: "center" }}>?????????? ??????????????</h3>}
                    {rank === 4 && <h3 style={{ textAlign: "center" }}>???????? ??????????????</h3>}
                    {rank === 5 && <h3 style={{ textAlign: "center" }}>?????????? ???? ??????????????</h3>}
                    {rank === 6 && <h3 style={{ textAlign: "center" }}>???????? ???????????? ????????????????</h3>}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            {newAdministrative ?
                                <>
                                    <p>?????????? : {newAdministrative.full_name}</p>
                                    <p>?????????? ?????????????? : {newAdministrative.teacher_id}</p>
                                    <p> ???????????? : {newAdministrative.rank}</p>
                                </>
                                : currentAdministrative &&
                                <>
                                    <p>?????????? : {currentAdministrative.full_name}</p>
                                    <p>?????????? ?????????????? : {currentAdministrative.teacher_id}</p>
                                    <p> ???????????? : {currentAdministrative.rank}</p>
                                </>
                            }
                        </div>
                        {showSearchField && <div style={{ width: "100%", marginTop: "2rem" }}>
                            <SearchableTextField
                                optionsList={searchList}
                                placeholder={"??????????"}
                                selectOption={SelectNewAdministrative}
                            />
                        </div>
                        }
                    </div>

                    <div style={{ marginTop: "2rem" }}>
                        <Button onClick={toggleSearchField} style={{ backgroundColor: "#098D9C" }} primary>
                            {`${showSearchField ? "??????????" : "??????????"}`}
                        </Button>
                        {newAdministrative &&
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                onClick={handleSubmit}
                                style={{ backgroundColor: "#098D9C" }}
                                primary>??????
                            </Button>}
                    </div>
                </>
            )}
        </div>
    )
}


export default Administrative;