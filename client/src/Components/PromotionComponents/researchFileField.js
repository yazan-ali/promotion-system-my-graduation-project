import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Select, Divider, Table } from 'semantic-ui-react';
import FileUpload from './fileUpload';
import { research_types, is_research_specialty } from '../../constants';
import uuid from 'uuid/dist/v4';
import { useDispatch, useSelector } from "react-redux";
import { setResearchFiles, removeResearchFile } from "../../state/actions/promotionRequestActions";

function ResearchFileField({ id, addResearchData, handleRemoveResearch, researchFile }) {

    const [researchData, setResearchData] = useState(researchFile ? researchFile : null)
    const [file, setFile] = useState(researchFile ? researchFile.file : null)
    const [researchPoints, setResearchPoints] = useState(researchFile ? researchFile.researchPoints : "")
    const [researchType, setResearchType] = useState(researchFile ? researchFile.researchType : null)
    const [researcherRank, setResearcherRank] = useState(researchFile ? researchFile.researcherRank : null)
    const [isResearchSpecialty, setIsResearchSpecialty] = useState(researchFile ? researchFile.isResearchSpecialty : null)

    const dispatch = useDispatch();


    useEffect(() => {
        if (researchData) {
            const research = {
                id: id ? id : uuid(),
                file,
                researchPoints: researchPoints === "" ? "" : parseInt(researchPoints),
                researchType,
                researcherRank: researchType === "غير منفرد" ? parseInt(researcherRank) : null,
                isResearchSpecialty: isResearchSpecialty,
            }

            if (addResearchData) {
                addResearchData(research)
            } else {
                dispatch(setResearchFiles(research))
            }
        }
    }, [researchData])

    const fileUpload = (file) => {
        const newResearchFile = {
            ...file,
        }
        setFile(file)
        setResearchData({ ...researchData, file: newResearchFile })
    }

    const handleResearchPointesChange = (evt) => {
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
        setResearchData({ ...researchData, researcherRank: parseInt(evt.target.value) })
        setResearcherRank(evt.target.value)
    }

    const handleSelectIsResearchSpecialty = (evt, data) => {
        setIsResearchSpecialty(data.value)
        setResearchData({ ...researchData, isResearchSpecialty: data.value })
    }

    const removeResearch = () => {
        if (handleRemoveResearch) {
            handleRemoveResearch(id);
        } else {
            dispatch(removeResearchFile(id))
        }
        setResearchData(null)
        setResearchPoints("")
        setResearchType("")
        setResearcherRank("")
        setIsResearchSpecialty("")
    }

    return (
        <Table.Row textAlign='right'>
            <Table.Cell>
                <i style={{ marginRight: 35, cursor: 'pointer', color: "gray" }} onClick={removeResearch} className="fas fa-minus-circle"></i>
            </Table.Cell>
            <Table.Cell>
                <Form>
                    <Form.Field>
                        <Select
                            style={{ textAlign: 'end' }}
                            placeholder='هل كان البحث في تخصصك الدقيق'
                            options={is_research_specialty}
                            value={isResearchSpecialty}
                            onChange={handleSelectIsResearchSpecialty}
                        />
                    </Form.Field>
                </Form>
            </Table.Cell>
            <Table.Cell>
                {
                    researchData && researchData.researchType === "غير منفرد" && (
                        <Form>
                            <Form.Field>
                                <input
                                    style={{ width: 120 }}
                                    value={researcherRank}
                                    placeholder='ترتيب الباحث'
                                    onChange={handleResearcherRankChange}
                                />
                            </Form.Field>
                        </Form>
                    )
                }
            </Table.Cell>
            <Table.Cell>
                <Form>
                    <Form.Field>
                        <Select
                            style={{ textAlign: 'end' }}
                            placeholder='منفرد'
                            options={research_types}
                            value={researchType}
                            onChange={handleSelectResearchType}
                        />
                    </Form.Field>
                </Form>
            </Table.Cell>
            <Table.Cell>
                <Form>
                    <Form.Field>
                        <input
                            value={researchPoints}
                            style={{ width: 100 }}
                            placeholder='عدد نقاط البحث'
                            onChange={handleResearchPointesChange}
                        />
                    </Form.Field>
                </Form>
            </Table.Cell>
            <Table.Cell>
                <Form>
                    <Form.Field>
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
                </Form>
            </Table.Cell>
        </Table.Row>
    )
}

export default ResearchFileField;