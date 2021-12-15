export const setPromotionRequest = (promotionRequest) => {
    return {
        type: "SET_PROMOTION_REQUEST",
        payload: promotionRequest,
    };
}

export const setUserFiles = (file) => {
    return {
        type: "SET_USER_FILE",
        payload: file,
    };
}

export const removeUserFile = (file_num) => {
    return {
        type: "REMOVE_USER_FILE",
        payload: file_num,
    };
}

export const setResearchFiles = (file) => {
    return {
        type: "SET_RESEARCH_FILE",
        payload: file,
    };
}

export const removeResearchFile = (id) => {
    return {
        type: "REMOVE_RESEARCH_FILE",
        payload: id,
    };
}

export const setCreateFormUserFiles = (file) => {
    return {
        type: "CREATE_FORM_SET_USER_FILES",
        payload: file,
    };
}

export const removeCreateFormUserFile = (file_num) => {
    return {
        type: "CREATE_FORM_REMOVE_USER_FILES",
        payload: file_num,
    };
}