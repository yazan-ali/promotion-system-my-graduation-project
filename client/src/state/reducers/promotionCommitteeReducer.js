export const PromotionCommitteeReducer = (state = { promotionCommittee: null, teachers: [], members: [] }, action) => {
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
            if (state.members.length < 3) {
                const newTeachers = state.teachers.map(teacher => {
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
            }
        case "REMOVE_MEMBER":
            const newMembers = state.members.filter(member => member._id !== action.payload)
            const newTeachers = state.teachers.map(teacher => {
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
        default:
            return state
    }
};

