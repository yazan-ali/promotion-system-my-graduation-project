import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Select } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import { research_types } from '../../constants';

function ResearchFileField({ idx, addResearchData, handleRemoveResearch, researchFile }) {

    const [researchData, setResearchData] = useState(researchFile ? researchFile : null)
    const [file, setFile] = useState(researchFile ? researchFile.file : null)
    const [researchPoints, setResearchPoints] = useState(researchFile ? researchFile.researchPoints : null)
    const [researchType, setResearchType] = useState(researchFile ? researchFile.researchType : null)
    const [researcherRank, setResearcherRank] = useState(researchFile ? researchFile.researcherRank : null)

    useEffect(() => {
        if (researchData) {
            const research = {
                file,
                researchPoints: parseInt(researchPoints),
                researchType,
                researcherRank: researchType === "غير منفرد" ? parseInt(researcherRank) : 0
            }
            addResearchData({ ...research, id: idx })
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
        if (data.value === "منفرد") {
            delete researchData.researcherRank
        }
        setResearchData({ ...researchData, researchType: data.value })
    }

    const handleResearcherRankChange = (evt) => {
        // setResearchPoints([...researchPoints, { [evt.target.name]: parseInt(evt.target.value) }])
        setResearchData({ ...researchData, researcherRank: parseInt(evt.target.value) })
        setResearcherRank(evt.target.value)
    }

    const removeResearch = () => {
        handleRemoveResearch(idx);
        setResearchData(null)
        setResearchPoints("")
        setResearchType("")
        setResearcherRank("")
    }

    return (
        <>
            <hr />
            <Form>
                <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "1rem" }}>
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
                    <Form.Field>
                        {/* <label>عدد نقاط البحث</label> */}
                        <input
                            value={researchPoints}
                            style={{ width: 100 }}
                            placeholder='عدد نقاط البحث'
                            onChange={handleResearchPointesChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Select
                            className="login-select"
                            placeholder='منفرد'
                            options={research_types}
                            value={researchType}
                            onChange={handleSelectResearchType}
                        />
                    </Form.Field>
                    {
                        researchData && researchData.researchType === "غير منفرد" && (
                            <Form.Field>
                                {/* <label>عدد نقاط البحث</label> */}
                                <input
                                    style={{ width: 120 }}
                                    value={researcherRank}
                                    placeholder='ترتيبك في البحث'
                                    onChange={handleResearcherRankChange}
                                />
                            </Form.Field>
                        )
                    }
                    <span onClick={removeResearch}>X</span>
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
