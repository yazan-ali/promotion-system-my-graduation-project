export const PromotionCommitteeReducer = (state = { promotionCommittee: null, teachers: [], members: [] }, action) => {
    let updatedMembers
    let newTeachers
    switch (action.type) {
        case "SET_PROMOTION_COMMITTEE":
            return { ...state, promotionCommittee: action.payload }
        case "SET_TEACHERS":
            return { ...state, teachers: action.payload }
        case "CLEAR_SELECTED_TEACHERS":
            const newTeachersList = state.teachers.map(teacher => {
                return { ...teacher, checked: false }
            })
            return { ...state, teachers: newTeachersList }
        case "SET_MEMBERS":
            return { ...state, members: action.payload }
        case "SET_MEMBER":
            if (state.members.some(m => m._id === action.payload._id)) return
            newTeachers = state.teachers.map(teacher => {
                if (teacher._id === action.payload._id) {
                    return { ...teacher, checked: true }
                } else {
                    return teacher
                }
            })
            return {
                ...state,
                teachers: newTeachers,
                members: [...state.members, action.payload]
            }
        case "REMOVE_MEMBER":
            const newMembers = state.members.filter(member => member._id !== action.payload)
            newTeachers = state.teachers.map(teacher => {
                if (teacher._id === action.payload) {
                    return { ...teacher, checked: false }
                }
                else {
                    return teacher
                }
            })
            return {
                ...state,
                teachers: newTeachers,
                members: newMembers
            }
        case "SET_PROMOTION_REQUESTES_FOR_MEMBER":
            return { ...state, promotionRequestsList: action.payload }
        case "SET_PROMOTION_REQUESTES_FOR_Wise_MEMBER":
            return { ...state, wisePromotionRequestsList: action.payload }
        case "SET_COMMITTEE_PROMOTION_REQUESTE":
            return { ...state, promotionRequest: action.payload }
        case "ADD_MEMBER_REJECT_REASON":
            const members = state.promotionRequest.members.map(member => {
                if (member._id === action.payload.member_id) {
                    return { ...member, rejectionReasons: [...member.rejectionReasons, action.payload.rejection_reason] }
                } else {
                    return member
                }
            })
            return {
                ...state,
                promotionRequest: {
                    ...state.promotionRequest,
                    members: members
                }
            }
        case "REMOVE_MEMBER_REJECT_REASON":
            updatedMembers = state.promotionRequest.members.map(member => {
                if (member._id === action.payload.member_id) {
                    const updatedRejectReason = member.rejectionReasons.filter(reason => reason.id !== action.payload.reason_id)
                    return { ...member, rejectionReasons: updatedRejectReason }
                } else {
                    return member
                }
            })
            return {
                ...state,
                promotionRequest: {
                    ...state.promotionRequest,
                    members: updatedMembers
                }
            }
        case "MEMBER_APPROVE":
            updatedMembers = state.promotionRequest.members.map(member => {
                if (member._id === action.payload) {
                    return { ...member, memberDecision: "approved", rejectionReasons: [] }
                } else {
                    return member
                }
            })
            return {
                ...state,
                promotionRequest: {
                    ...state.promotionRequest,
                    members: updatedMembers
                }
            }
        case "MEMBER_REJECT":
            updatedMembers = state.promotionRequest.members.map(member => {
                if (member._id === action.payload) {
                    return { ...member, memberDecision: "rejected" }
                } else {
                    return member
                }
            })
            return {
                ...state,
                promotionRequest: {
                    ...state.promotionRequest,
                    members: updatedMembers
                }
            }
        default:
            return state
    }
};

