export const setPromotionRequest = (promotionRequest) => {
    return {
        type: "SET_PROMOTION_REQUEST",
        payload: promotionRequest,
    };
}

export const setUserFiles = (file) => {
    return {
        type: "SET_USER_FILES",
        payload: file,
    };
}

export const removeUserFile = (file_num) => {
    return {
        type: "REMOVE_USER_FILES",
        payload: file_num,
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