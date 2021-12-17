export const TeacherDataReducer = (state = null, action) => {
    let updatedPromotionRequest
    switch (action.type) {
        case "SET_TEACHER_DATA":
            return action.payload
        case "SET_ADMINISTRATIVE_FILE":
            updatedPromotionRequest = {
                ...state.promotionRequest,
                administrative_files: {
                    ...state.promotionRequest.administrative_files,
                    [`file_${action.payload.file_num}`]: action.payload.file
                }
            }
            return { ...state, promotionRequest: updatedPromotionRequest }
        case "REMOVE_ADMINISTRATIVE_FILE":
            const currentFiles = { ...state.promotionRequest.administrative_files }
            delete currentFiles[`file_${action.payload}`]
            updatedPromotionRequest = {
                ...state.promotionRequest,
                administrative_files: currentFiles
            }
            return { ...state, promotionRequest: updatedPromotionRequest }
        case "ADD_REJECT_REASON":
            return {
                ...state,
                promotionRequest: {
                    ...state.promotionRequest,
                    rejectionReasons: [...state.promotionRequest.rejectionReasons, action.payload]
                }
            }
        case "REMOVE_REJECT_REASON":
            const updatedRejectReason = state.promotionRequest.rejectionReasons.filter(
                reason => reason.id !== action.payload
            )
            return {
                ...state,
                promotionRequest: {
                    ...state.promotionRequest,
                    rejectionReasons: updatedRejectReason
                }
            }
        default:
            return state
    }
};