import React, { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import ResearchFileField from './researchFileField';
import { useSelector } from "react-redux";
import FileUpload from './fileUpload';

function EditResearchFiles({ user, toggleShowResearchFiles, checkIfCanSubmit, promotionType, files, administrative_years_files }) {


    const [fieldsNum, setFieldsNum] = useState(1);
    const [researchPoints, setResearchPoints] = useState(0);
    const [aloneResearchPoints, setAloneResearchPoints] = useState(0);
    const [researchSpecialtyPoints, setResearchSpecialtyPoints] = useState(0);
    const [errors, setErrors] = useState({
        err_1: true,
        err_2: true,
        err_3: true,
    })

    const researchFiles = useSelector((state) => state.promotionRequest.user_files.researchFiles);

    const promotionPointsScale = promotionType === "ترقية أستاذ مشارك" ? 8 : 12

    useEffect(() => {
        calculateResearchPoints(researchFiles)
        checkIfMore50Pre(researchFiles)
        checkIfMore70Pre(researchFiles)
        ResearchCondition(researchFiles)
    }, [researchFiles, administrative_years_files])

    const calculateResearchPoints = (researchFiles) => {
        let researchPoints = 0;

        administrative_years_files.map(file => {
            if (file) {
                researchPoints += 0.5
            }
        })

        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null && research.file) {
                researchPoints += research.researchPoints
            }
        })
        setResearchPoints(researchPoints)
        if (researchPoints < promotionPointsScale) {
            errors["err_1"] = true
        } else {
            errors["err_1"] = null
        }
    }

    const ResearchCondition = (researchFiles) => {
        if (checkNumOfAlonResearch(researchFiles) || checkMainResearcher(researchFiles)) {
            errors["err_4"] = null
        } else {
            errors["err_4"] = true
        }
    }

    const checkNumOfAlonResearch = (researchFiles) => {

        let numOfAloanResearch = 0;
        let result = false;

        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null && research.file) {
                if (research.researchType === "منفرد") {
                    numOfAloanResearch += 1
                }
            }
        })
        if (promotionPointsScale === 8) {
            result = numOfAloanResearch >= 2;
        } else {
            result = numOfAloanResearch >= 3;
        }

        return result;
    }

    const checkMainResearcher = (researchFiles) => {

        let mainResearcher = 0;
        let result = false;

        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null && research.file) {
                if ((research.researchType === "منفرد" || research.researcherRank === 1) && research.researchPoints === 3) {
                    mainResearcher += 1
                }
            }
        })
        if (promotionPointsScale === 8) {
            result = mainResearcher >= 1 && checkIfFirstRankResearch(researchFiles);
        } else {
            result = mainResearcher >= 2 && checkIfFirstRankResearch(researchFiles);
        }

        return result;
    }

    const checkIfFirstRankResearch = (researchFiles) => {
        let firstRankResearch = 0;
        let result = false;

        researchFiles.map(research => {
            if (research.researchPoints === 3) {
                firstRankResearch += 1
            }
        })

        if (promotionPointsScale === 8) {
            result = firstRankResearch >= 2;
        } else {
            result = firstRankResearch >= 3;
        }

        return result;

    }

    const checkIfMore50Pre = (researchFiles) => {
        let aloneResearchPoints = 0;
        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null && research.file) {
                if (research.researchType === "منفرد" || research.researcherRank === 1) {
                    aloneResearchPoints += research.researchPoints
                }
            }
        })
        setAloneResearchPoints(aloneResearchPoints)
        if (aloneResearchPoints / promotionPointsScale < 0.50) {
            errors["err_2"] = true
        } else {
            errors["err_2"] = null
        }
    }

    const checkIfMore70Pre = (researchFiles) => {
        let researchSpecialtyPoints = 0;
        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null && research.file) {
                if (research.isResearchSpecialty === true) {
                    researchSpecialtyPoints += research.researchPoints
                }
            }
        })
        setResearchSpecialtyPoints(researchSpecialtyPoints)
        if (researchSpecialtyPoints / promotionPointsScale < 0.70) {
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
    }

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>حساب نقاط الترقية</h3>
            <Table celled>
                <Table.Header>
                    <Table.Row textAlign='right'>
                        <Table.HeaderCell>حذف</Table.HeaderCell>
                        <Table.HeaderCell>ضمن التخصص الدقيق</Table.HeaderCell>
                        <Table.HeaderCell>ترتيب الباحث</Table.HeaderCell>
                        <Table.HeaderCell>الإنفرادية في البحث</Table.HeaderCell>
                        <Table.HeaderCell>عدد نقاط البحث</Table.HeaderCell>
                        <Table.HeaderCell>ملف البحث</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        researchFiles.map((research, idx) => (
                            <ResearchFileField
                                key={research.id}
                                id={research.id}
                                user={user}
                                researchFile={research}
                            />
                        ))
                    }

                    {
                        Array.from({ length: fieldsNum }).map((field, idx) => (
                            <ResearchFileField
                                key={researchFiles.length + idx + 1}
                                user={user}
                            />
                        ))
                    }
                </Table.Body>
            </Table>

            <FileUpload
                label={files.file_7 ? "السنة الإدارية الأولى" : "السنة الإدارية الأولى (إن كنت تمتلك)"}
                fileData={files.file_7 && files.file_7}
                n={7}
                canEdit={true}
            />

            <FileUpload
                label={files.file_8 ? "السنة الإدارية الثانية" : "السنة الإدارية الثانية (إن كنت تمتلك)"}
                fileData={files.file_8 && files.file_8}
                n={8}
                canEdit={true}
            />

            <p style={{ color: errors.err_1 ? "red" : "green", fontSize: 13 }}>
                {`يجب أن تمتلك نقاط ترقية على الأقل ${promotionPointsScale} نقاط `}
                <span style={{ color: "gray" }}>{` : عدد النقاط الحالية ${researchPoints}`}</span>
            </p>
            <p style={{ color: errors.err_2 ? "red" : "green", fontSize: 13 }}>
                يجب أن يكون المتقدم باحثاً رئيساً في انتاج علمي يعادل ({promotionPointsScale / 2}) نقاط على الأقل
                <span style={{ color: "gray" }}>{` : عدد النقاط الحالية ${aloneResearchPoints}`}</span>
            </p>
            <p style={{ color: errors.err_3 ? "red" : "green", fontSize: 13 }}>
                يجب أن يكون ما نسبته 70% على الأقل من الإنتاج العلمي في التخصص الدقيق
                <span style={{ color: "gray" }}>{` : النسبة الحالية ${researchSpecialtyPoints / promotionPointsScale}`}</span>
            </p>
            {
                promotionPointsScale === 8 ?
                    <p style={{ color: errors.err_4 ? "red" : "green", fontSize: 13 }}>
                        أن يتضمن الأنتاج العلمي كحد أدنى بحثين منشورين يكون الباحث فيهما باحثاً منفرداً أو بحثين منشورين في
                        مجلات من الفئة الأولى يكون المتقدم باحثاً رئيساً في واحد منهما على الأقل
                    </p>
                    :
                    <p style={{ color: errors.err_4 ? "red" : "green" }}>
                        أن يتضمن الأنتاج العلمي كحد أدنى ثلاث بحوث منشورة يكون الباحث فيهما باحثاً منفرداً أو ثلاث بحوث منشورة في
                        مجلات من الفئة الأولى يكون المتقدم باحثاً رئيساً في اثنين منهما على الأقل
                    </p>
            }
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