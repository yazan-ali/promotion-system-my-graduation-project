export const PromotionRequestReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_PROMOTION_REQUEST":
            return action.payload
        case "SET_USER_FILES":
            return { ...state, user_files: { ...state.user_files, [`file_${action.payload.file_num}`]: action.payload.file } }
        case "REMOVE_USER_FILES":
            let currentFiles = { ...state.user_files }
            delete currentFiles[`file_${action.payload}`]
            return { ...state, user_files: { ...currentFiles } }
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