export const setTeacherData = (teacher_data) => {
    return {
        type: "SET_TEACHER_DATA",
        payload: teacher_data,
    };
}

export const setAdministrativeFile = (file) => {
    return {
        type: "SET_ADMINISTRATIVE_FILE",
        payload: file,
    };
}

export const removeAdministrativeFile = (file_num) => {
    return {
        type: "REMOVE_ADMINISTRATIVE_FILE",
        payload: file_num,
    };
}

export const addRejectionReason = (reason) => {
    return {
        type: "ADD_REJECT_REASON",
        payload: reason,
    };
}

export const removeRejectionReason = (id) => {
    return {
        type: "REMOVE_REJECT_REASON",
        payload: id,
    };
}