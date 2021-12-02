import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Select } from 'semantic-ui-react';
import ResearchFileField from './researchFileField';

function EditResearchFiles({ user, addResearchFiles, researchFilesData, toggleShowResearchFiles, checkIfCanSubmit }) {

    const [fieldsNum, setFieldsNum] = useState(1);
    const [researchFiles, setResearchFiles] = useState(researchFilesData ? researchFilesData : []);
    const [researchPoints, setResearchPoints] = useState(0);
    const [aloneResearchPoints, setAloneResearchPoints] = useState(0);
    const [researchSpecialtyPoints, setResearchSpecialtyPoints] = useState(0);
    const [errors, setErrors] = useState({
        err_1: true,
        err_2: true,
        err_3: true,
    })

    useEffect(() => {
        calculateResearchPoints(researchFiles)
        checkIfMore60Pre(researchFiles)
        checkIfMore70Pre(researchFiles)
    }, [researchFiles])

    const increaseFields = () => {
        setFieldsNum(prev => prev + 1);
    }

    const addResearchData = (researchData) => {
        let newFiles;
        const file = researchFiles.find(file => file.id === researchData.id);
        if (!file) {
            newFiles = [...researchFiles, researchData]
        } else {
            newFiles = researchFiles.map(file => {
                if (file.id === researchData.id) {
                    return researchData
                } else {
                    return file
                }
            })
        }
        setResearchFiles(newFiles);
    }

    const handleRemoveResearch = (id) => {
        const updatedResearchFiles = researchFiles.filter(research => research.id !== id)
        setResearchFiles(updatedResearchFiles)
    }

    const calculateResearchPoints = (researchFiles) => {
        let researchPoints = 0;
        researchFiles.map(research => {
            // if (research.file) {
            researchPoints += research.researchPoints
            // }
        })
        setResearchPoints(researchPoints)
        if (researchPoints < 8) {
            errors["err_1"] = true
        } else {
            errors["err_1"] = null
        }
    }

    const checkIfMore60Pre = (researchFiles) => {
        let aloneResearchPoints = 0;
        researchFiles.map(research => {
            if (research.researchType === "منفرد") {
                aloneResearchPoints += research.researchPoints
            }
        })
        setAloneResearchPoints(aloneResearchPoints)
        if (aloneResearchPoints / 8 < 0.60) {
            errors["err_2"] = true
        } else {
            errors["err_2"] = null
        }
    }

    const checkIfMore70Pre = (researchFiles) => {
        let researchSpecialtyPoints = 0;
        researchFiles.map(research => {
            if (research.isResearchSpecialty === true) {
                researchSpecialtyPoints += research.researchPoints
            }
        })
        setResearchSpecialtyPoints(researchSpecialtyPoints)
        if (researchSpecialtyPoints / 8 < 0.70) {
            errors["err_3"] = true
        } else {
            errors["err_3"] = null
        }
    }

    const handleSaveResearchFiles = () => {
        if (!errors.err_1 && !errors.err_2 && !errors.err_3) {
            toggleShowResearchFiles()
            checkIfCanSubmit(true)
        } else {
            checkIfCanSubmit(false)
        }
        addResearchFiles(researchFiles)
    }

    return (
        <div>
            <Form style={{ marginTop: 20 }}>
                {
                    researchFiles.map((research, idx) => (
                        <ResearchFileField
                            key={research.id}
                            idx={research.id}
                            addResearchData={addResearchData}
                            user={user}
                            handleRemoveResearch={handleRemoveResearch}
                            researchFile={research}
                        />
                    ))
                }
                {
                    Array.from({ length: fieldsNum }).map((field, idx) => (
                        <ResearchFileField
                            key={researchFiles.length + idx + 1}
                            idx={researchFiles.length + idx + 1}
                            addResearchData={addResearchData}
                            user={user}
                            handleRemoveResearch={handleRemoveResearch}
                        />
                    ))
                }
                <Button
                    onClick={increaseFields}
                    style={{ marginTop: 20 }}
                    type='button'>إضافة بحث آخر</Button>

                <p style={{ color: errors.err_1 ? "red" : "green" }}>يجب ان تمتلك 8 نقاط ترقية على لأقل</p>
                <p style={{ color: errors.err_2 ? "red" : "green" }}>أكثر من %60</p>
                <p style={{ color: errors.err_3 ? "red" : "green" }}>أكثر من %70</p>

                {/* {errors.files && <div style={{ paddingTop: 10 }}>
                    <Label basic color='red' pointing="right">
                        {errors.files}
                    </Label>
                </div>} */}
                {/* <Button
                    onClick={() => handleShowCreateForm()}
                    style={{ width: 92, marginTop: 30, marginRight: 20 }}
                    type='button'>إلغاء</Button>
                <Button
                    style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }} primary
                    type='submit'>حفظ</Button> */}
            </Form>
            <Button
                onClick={() => toggleShowResearchFiles()}
                style={{ marginTop: 20, marginRight: 10 }}
                type='button'>إلغاء</Button>
            <Button
                onClick={handleSaveResearchFiles}
                style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }} primary
                type='button'>حفظ</Button>
        </div >
    )
}


export default EditResearchFiles;