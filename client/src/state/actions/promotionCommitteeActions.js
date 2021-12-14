export const setPromotionCommittee = (promotionCommittee) => {
    return {
        type: "SET_PROMOTION_COMMITTEE",
        payload: promotionCommittee,
    };
}

export const setTeachers = (teachers) => {
    return {
        type: "SET_TEACHERS",
        payload: teachers,
    };
}

export const clearSelectedTeachers = () => {
    return {
        type: "CLEAR_SELECTED_TEACHERS",
    };
}

export const setMembers = (members) => {
    return {
        type: "SET_MEMBERS",
        payload: members,
    };
}

export const setMember = (member) => {
    return {
        type: "SET_MEMBER",
        payload: member,
    };
}

export const removeMember = (id) => {
    return {
        type: "REMOVE_MEMBER",
        payload: id,
    };
}
