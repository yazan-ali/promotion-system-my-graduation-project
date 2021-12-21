export const setTeachers = (teachers) => {
    return {
        type: "SET_TEACHERS",
        payload: teachers,
    };
}

export const setTeachersSearchList = (teachers) => {
    return {
        type: "SET_TEACHERS_SEARCH_LIST",
        payload: teachers,
    };
}

export const setCollegeAdministratives = (collegeAdministratives) => {
    return {
        type: "SET_COLLEGE_ADMINSTRATIVES",
        payload: collegeAdministratives
    }
}