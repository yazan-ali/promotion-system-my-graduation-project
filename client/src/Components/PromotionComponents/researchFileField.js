import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Select, Divider } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import { research_types, is_research_specialty } from '../../constants';
import uuid from 'uuid/dist/v4';

function ResearchFileField({ idx, addResearchData, handleRemoveResearch, researchFile }) {

    const [researchData, setResearchData] = useState(researchFile ? researchFile : null)
    const [file, setFile] = useState(researchFile ? researchFile.file : null)
    const [researchPoints, setResearchPoints] = useState(researchFile ? researchFile.researchPoints : null)
    const [researchType, setResearchType] = useState(researchFile ? researchFile.researchType : null)
    const [researcherRank, setResearcherRank] = useState(researchFile ? researchFile.researcherRank : null)
    const [isResearchSpecialty, setIsResearchSpecialty] = useState(researchFile ? researchFile.isResearchSpecialty : null)

    useEffect(() => {
        if (researchData) {
            const research = {
                id: idx,
                file,
                researchPoints: parseInt(researchPoints),
                researchType,
                researcherRank: researchType === "غير منفرد" ? parseInt(researcherRank) : null,
                isResearchSpecialty: isResearchSpecialty,
            }

            addResearchData(research)
            // addResearchData({ ...research, id: researchData.id ? researchData.id : uuid() })
        }
    }, [researchData])

    const fileUpload = (file) => {
        const newResearchFile = {
            ...file,
        }
        setFile(file)
        setResearchData({ ...researchData, file: newResearchFile })
        // setResearchFiles([...researchFiles, newResearchFile])
    }

    const handleResearchPointesChange = (evt) => {
        // setResearchPoints([...researchPoints, { [evt.target.name]: parseInt(evt.target.value) }])
        setResearchPoints(evt.target.value)
        setResearchData({ ...researchData, researchPoints: parseInt(evt.target.value) })
    }

    const handleSelectResearchType = (evt, data) => {
        setResearchType(data.value)
        if (data.value === "منفرد" && researcherRank) {
            delete researchData.researcherRank
        }
        setResearchData({ ...researchData, researchType: data.value })
    }

    const handleResearcherRankChange = (evt) => {
        // setResearchPoints([...researchPoints, { [evt.target.name]: parseInt(evt.target.value) }])
        setResearchData({ ...researchData, researcherRank: parseInt(evt.target.value) })
        setResearcherRank(evt.target.value)
    }

    const handleSelectIsResearchSpecialty = (evt, data) => {
        setIsResearchSpecialty(data.value)
        setResearchData({ ...researchData, isResearchSpecialty: data.value })
    }

    const removeResearch = () => {
        handleRemoveResearch(idx);
        setResearchData(null)
        setResearchPoints("")
        setResearchType("")
        setResearcherRank("")
        setIsResearchSpecialty("")
    }

    return (
        <>
            <hr />
            {/* <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "1rem" }}>
                <span>ملف البحث</span>
                <span>نقاط البحث</span>
                <span>الانفرادية</span>
                {researchType === "غير منفرد" && <span>ترتيب الباحث</span>}
                <span>تخصص البحث</span>
            </div> */}
            <Form>
                <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "1rem" }}>
                    <Form.Field>
                        <label>ملف البحث</label>
                        {researchData && researchData.file ? (
                            <p className="file">
                                <span>{researchData.file.name}</span>
                            </p>
                        ) : (
                            <FileUpload
                                doNotShowFile={true}
                                fileUpload={fileUpload}
                            />
                        )
                        }
                    </Form.Field>
                    <Form.Field>
                        <label>عدد نقاط البحث</label>
                        <input
                            value={researchPoints}
                            style={{ width: 100 }}
                            placeholder='عدد نقاط البحث'
                            onChange={handleResearchPointesChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>الانفرادية</label>
                        <Select
                            style={{ textAlign: 'end' }}
                            placeholder='منفرد'
                            options={research_types}
                            value={researchType}
                            onChange={handleSelectResearchType}
                        />
                    </Form.Field>
                    {
                        researchData && researchData.researchType === "غير منفرد" && (
                            <Form.Field>
                                <label>ترتيب الباحث</label>
                                <input
                                    style={{ width: 120 }}
                                    value={researcherRank}
                                    placeholder='ترتيب الباحث'
                                    onChange={handleResearcherRankChange}
                                />
                            </Form.Field>
                        )
                    }
                    <Form.Field>
                        <label>تخصص البحث</label>
                        <Select
                            style={{ textAlign: 'end' }}
                            placeholder='هل كان البحث في تخصصك الدقيق'
                            options={is_research_specialty}
                            value={isResearchSpecialty}
                            onChange={handleSelectIsResearchSpecialty}
                        />
                    </Form.Field>
                    <i style={{ marginTop: 35, cursor: 'pointer', color: "gray" }} onClick={removeResearch} className="fas fa-minus-circle"></i>
                </div>
            </Form>
            {/* <Button
                onClick={() => addResearchData(idx, { ...researchData, id: idx })}
                style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }}
                primary
                type='button'>+</Button> */}
        </>
    )
}

export default ResearchFileField;
