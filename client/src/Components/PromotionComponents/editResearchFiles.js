import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Select } from 'semantic-ui-react';
import ResearchFileField from './researchFileField';
import { useDispatch, useSelector } from "react-redux";
import { setResearchFiles } from "../../state/actions/promotionRequestActions";

function EditResearchFiles({ user, toggleShowResearchFiles, checkIfCanSubmit, promotionType }) {


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
    EditResearchFiles.filesLen = 10;

    const promotionPointsScale = promotionType === "ترقية أستاذ مشارك" ? 8 : 12

    useEffect(() => {
        calculateResearchPoints(researchFiles)
        checkIfMore60Pre(researchFiles)
        checkIfMore70Pre(researchFiles)
    }, [researchFiles])

    const calculateResearchPoints = (researchFiles) => {
        let researchPoints = 0;
        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null) {
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

    const checkIfMore60Pre = (researchFiles) => {
        let aloneResearchPoints = 0;
        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null) {
                if (research.researchType === "منفرد") {
                    aloneResearchPoints += research.researchPoints
                }
            }
        })
        setAloneResearchPoints(aloneResearchPoints)
        if (aloneResearchPoints / promotionPointsScale < 0.60) {
            errors["err_2"] = true
        } else {
            errors["err_2"] = null
        }
    }

    const checkIfMore70Pre = (researchFiles) => {
        let researchSpecialtyPoints = 0;
        researchFiles.map(research => {
            if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null) {
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
            <Form style={{ marginTop: 20 }}>
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
                <p style={{ color: errors.err_1 ? "red" : "green" }}>{`يجب ان تمتلك ${promotionPointsScale} نقاط ترقية على لأقل`}</p>
                <p style={{ color: errors.err_2 ? "red" : "green" }}>أكثر من %60</p>
                <p style={{ color: errors.err_3 ? "red" : "green" }}>أكثر من %70</p>
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


// import React, { useState, useEffect } from 'react';
// import { Button, Form, Label, Select, Table } from 'semantic-ui-react';
// import ResearchFileField from './researchFileField';
// import { useDispatch, useSelector } from "react-redux";
// import { setResearchFiles } from "../../state/actions/promotionRequestActions";

// function EditResearchFiles({ user, toggleShowResearchFiles, checkIfCanSubmit, promotionType }) {


//     const [fieldsNum, setFieldsNum] = useState(1);
//     const [researchPoints, setResearchPoints] = useState(0);
//     const [aloneResearchPoints, setAloneResearchPoints] = useState(0);
//     const [researchSpecialtyPoints, setResearchSpecialtyPoints] = useState(0);
//     const [errors, setErrors] = useState({
//         err_1: true,
//         err_2: true,
//         err_3: true,
//     })

//     const researchFiles = useSelector((state) => state.promotionRequest.user_files.researchFiles);
//     EditResearchFiles.filesLen = 10;

//     const promotionPointsScale = promotionType === "ترقية أستاذ مشارك" ? 8 : 12

//     useEffect(() => {
//         calculateResearchPoints(researchFiles)
//         checkIfMore60Pre(researchFiles)
//         checkIfMore70Pre(researchFiles)
//     }, [researchFiles])

//     const calculateResearchPoints = (researchFiles) => {
//         let researchPoints = 0;
//         researchFiles.map(research => {
//             if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null) {
//                 researchPoints += research.researchPoints
//             }
//         })
//         setResearchPoints(researchPoints)
//         if (researchPoints < promotionPointsScale) {
//             errors["err_1"] = true
//         } else {
//             errors["err_1"] = null
//         }
//     }

//     const checkIfMore60Pre = (researchFiles) => {
//         let aloneResearchPoints = 0;
//         researchFiles.map(research => {
//             if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null) {
//                 if (research.researchType === "منفرد") {
//                     aloneResearchPoints += research.researchPoints
//                 }
//             }
//         })
//         setAloneResearchPoints(aloneResearchPoints)
//         if (aloneResearchPoints / promotionPointsScale < 0.60) {
//             errors["err_2"] = true
//         } else {
//             errors["err_2"] = null
//         }
//     }

//     const checkIfMore70Pre = (researchFiles) => {
//         let researchSpecialtyPoints = 0;
//         researchFiles.map(research => {
//             if (research.researchPoints && research.researchType && research.isResearchSpecialty !== null) {
//                 if (research.isResearchSpecialty === true) {
//                     researchSpecialtyPoints += research.researchPoints
//                 }
//             }
//         })
//         setResearchSpecialtyPoints(researchSpecialtyPoints)
//         if (researchSpecialtyPoints / promotionPointsScale < 0.70) {
//             errors["err_3"] = true
//         } else {
//             errors["err_3"] = null
//         }
//     }

//     const handleSaveResearchFiles = () => {
//         if (!errors.err_1 && !errors.err_2 && !errors.err_3) {
//             toggleShowResearchFiles()
//             checkIfCanSubmit(true)
//         } else {
//             checkIfCanSubmit(false)
//         }
//     }

//     return (
//         <div>
//             <h3 style={{ textAlign: 'center' }}>حساب نقاط الترقية</h3>
//             <Table celled>
//                 <Table.Header>
//                     <Table.Row>
//                         <Table.HeaderCell textAlign='center'>ملف البحث</Table.HeaderCell>
//                         <Table.HeaderCell textAlign='center'>نقاط البحث</Table.HeaderCell>
//                         <Table.HeaderCell textAlign='center'>الإنفرادية في البحث</Table.HeaderCell>
//                         <Table.HeaderCell textAlign='center'>ضمن التخصص الدقيق</Table.HeaderCell>
//                         <Table.HeaderCell textAlign='center'>ترتيب الباحث</Table.HeaderCell>
//                     </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                     {
//                         researchFiles.map((research, idx) => (
//                             <ResearchFileField
//                                 key={research.id}
//                                 id={research.id}
//                                 user={user}
//                                 researchFile={research}
//                             />
//                         ))
//                     }
//                     {
//                         Array.from({ length: fieldsNum }).map((field, idx) => (
//                             <ResearchFileField
//                                 key={researchFiles.length + idx + 1}
//                                 user={user}
//                             />
//                         ))
//                     }
//                 </Table.Body>
//             </Table>
//             <p style={{ color: errors.err_1 ? "red" : "green" }}>{`يجب ان تمتلك ${promotionPointsScale} نقاط ترقية على لأقل`}</p>
//             <p style={{ color: errors.err_2 ? "red" : "green" }}>أكثر من %60</p>
//             <p style={{ color: errors.err_3 ? "red" : "green" }}>أكثر من %70</p>
//             <Button
//                 onClick={() => toggleShowResearchFiles()}
//                 style={{ marginTop: 20, marginRight: 10 }}
//                 type='button'>إلغاء</Button>
//             <Button
//                 onClick={handleSaveResearchFiles}
//                 style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }} primary
//                 type='button'>حفظ</Button>
//         </div >
//     )
// }


// export default EditResearchFiles;