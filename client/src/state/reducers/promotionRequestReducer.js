export const PromotionRequestReducer = (state = null, action) => {
    let currentFiles
    switch (action.type) {
        case "SET_PROMOTION_REQUEST":
            return action.payload
        case "SET_USER_FILE":
            return { ...state, user_files: { ...state.user_files, [`file_${action.payload.file_num}`]: action.payload.file } }
        case "REMOVE_USER_FILE":
            currentFiles = { ...state.user_files }
            delete currentFiles[`file_${action.payload}`]
            return { ...state, user_files: { ...currentFiles } }
        case "SET_RESEARCH_FILE":
            let newFiles;
            const file = state.user_files.researchFiles.find(file => file.id === action.payload.id);
            if (!file) {
                newFiles = [...state.user_files.researchFiles, action.payload]
            } else {
                newFiles = state.user_files.researchFiles.map(file => {
                    if (file.id === action.payload.id) {
                        return action.payload
                    } else {
                        return file
                    }
                })
            }
            return { ...state, user_files: { ...state.user_files, researchFiles: newFiles } }
        case "REMOVE_RESEARCH_FILE":
            const updatedResearchFiles = state.user_files.researchFiles.filter(research => research.id !== action.payload)
            return { ...state, user_files: { ...state.user_files, researchFiles: updatedResearchFiles } }
        default:
            return state
    }
};

export const CreatePromotionRequestReducer = (state = null, action) => {
    switch (action.type) {
        case "CREATE_FORM_SET_USER_FILES":
            console.log({ ...state, files: { ...state.files, [`file_${action.payload.file_num}`]: action.payload.file } })
            return { ...state, files: { ...state.files, [`file_${action.payload.file_num}`]: action.payload.file } }
        case "CREATE_FORM_REMOVE_USER_FILES":
            let currentFiles = { ...state.user_files }
            delete currentFiles[`file_${action.payload}`]
            return { ...state, files: { ...currentFiles } }
        default:
            return state
    }
};