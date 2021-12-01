import React, { useState, useEffect } from 'react';
import { Button, Form, Label, Select } from 'semantic-ui-react';
import ResearchFileField from './researchFileField';

function EditResearchFiles({ user, addResearchFiles, researchFilesData }) {

    const [fieldsNum, setFieldsNum] = useState(1);
    const [researchFiles, setResearchFiles] = useState(researchFilesData ? researchFilesData : []);

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

    const handleSaveResearchFiles = () => {
        addResearchFiles(researchFiles)
    }

    return (
        <div>
            <Form style={{ marginTop: 20 }}>
                {
                    researchFiles.map(research => (
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
                    style={{ width: 92, marginTop: 20 }}
                    type='button'>+</Button>
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
                <Button
                    onClick={handleSaveResearchFiles}
                    style={{ width: 92, marginTop: 20, backgroundColor: "#098D9C", color: "#fff" }} primary
                    type='button'>حفظ</Button>
            </Form>
        </div >
    )
}


export default EditResearchFiles;