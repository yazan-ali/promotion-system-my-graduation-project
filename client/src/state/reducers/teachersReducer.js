export const TeachersReducer = (state = { teachersList: [], collegeAdministratives: [], teachersSearchList: [] }, action) => {
    switch (action.type) {
        case "SET_TEACHERS":
            return { ...state, teachersList: action.payload }
        case "SET_COLLEGE_ADMINSTRATIVES":
            return { ...state, collegeAdministratives: action.payload }
        case "SET_TEACHERS_SEARCH_LIST":
            return { ...state, teachersSearchList: action.payload }
        default:
            return state
    }
};